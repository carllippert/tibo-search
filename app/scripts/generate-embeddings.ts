import { dbClient } from '@/app/db/turso';
import { createEmbeddings } from '@/app/embeddings/openai';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

// Helper function to clean tweet text
function preprocessTweetText(text: string): string {
  return text
    // Remove URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove mentions but keep the username for context
    .replace(/@(\w+)/g, '$1')
    // Remove RT prefix
    .replace(/^RT\s+/g, '')
    // Remove multiple spaces
    .replace(/\s+/g, ' ')
    // Remove hashtag symbol but keep the text
    .replace(/#(\w+)/g, '$1')
    // Remove special characters but keep emojis
    .replace(/[^\p{L}\p{N}\p{P}\p{Z}\p{Emoji}\p{Emoji_Presentation}]/gu, ' ')
    .trim();
}

async function main() {
  try {
    // Create read stream for tweets.jsonl
    const fileStream = createReadStream('tweets.jsonl');
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    // Process each line (tweet) in the file
    for await (const line of rl) {
      try {
        const tweet = JSON.parse(line);

        // Skip tweets with errors or missing text
        if (tweet.error || !tweet.full_text) {
          console.log('Skipping invalid tweet:', tweet.error || 'No text content');
          continue;
        }

        // Clean and preprocess the tweet text
        const cleanedText = preprocessTweetText(tweet.full_text);
        
        // Skip if text is too short after cleaning
        if (cleanedText.length < 10) {
          console.log('Skipping tweet with insufficient content after cleaning');
          continue;
        }

        // Generate embedding for tweet content
        const embedding = await createEmbeddings(cleanedText);
        
        // Store tweet data and embedding
        await storeTweet({
          tweet_id: tweet.id_str,
          user_id: tweet.user.id_str,
          username: tweet.user.screen_name,
          content: tweet.full_text, // Store original content for display
          cleaned_content: cleanedText, // Store cleaned content for reference
          created_at: tweet.created_at,
          favorite_count: tweet.favorite_count,
          retweet_count: tweet.retweet_count,
          reply_count: tweet.reply_count,
          quote_count: tweet.quote_count,
          embedding,
        });

      } catch (error) {
        console.error('Error processing tweet:', error);
        // Continue with next tweet instead of exiting
        continue;
      }
    }

    console.log('Successfully processed all tweets');
    
  } catch (error) {
    console.error('Error processing tweets:', error);
    process.exit(1);
  }
}

async function storeTweet(data: {
  tweet_id: string;
  user_id: string;
  username: string;
  content: string;
  cleaned_content: string;
  created_at: string;
  favorite_count: number;
  retweet_count: number;
  reply_count: number;
  quote_count: number;
  embedding: number[];
}) {
  try {
    await dbClient.execute({
      sql: `INSERT INTO tweets (
        tweet_id, user_id, username, content, cleaned_content, created_at, 
        favorite_count, retweet_count, reply_count, quote_count,
        embedding
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        data.tweet_id,
        data.user_id,
        data.username,
        data.content,
        data.cleaned_content,
        data.created_at,
        data.favorite_count,
        data.retweet_count,
        data.reply_count,
        data.quote_count,
        new Float32Array(data.embedding).buffer as ArrayBuffer
      ]
    });
    
    console.log(`Stored tweet ${data.tweet_id}`);
  } catch (error) {
    console.error(`Error storing tweet ${data.tweet_id}:`, error);
    throw error;
  }
}

// Execute the script
main().catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
});