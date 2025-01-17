import { dbClient } from '@/app/db/turso';
import { createEmbeddings } from '@/app/embeddings/openai';

// Test with just 2 tweets initially
const SAMPLE_TWEETS = [
  {
    id_str: "1785613648720703634",
    user: {
      id_str: "470129898", 
      screen_name: "tibo_maker"
    },
    full_text: "𝗛𝗼𝘁 𝘁𝗮𝗸𝗲:\n\nInstagram: Average people pretend to be millionaires.\n\nTwitter: Millionaires pretend to be average people.",
    created_at: "Wed May 01 10:14:03 +0000 2024",
    favorite_count: 0,
    retweet_count: 0,
    reply_count: 0,
    quote_count: 0,
  },
  {
    id_str: "1646511342906638337",
    user: {
      id_str: "470129898",
      screen_name: "tibo_maker"
    },
    full_text: "I spent hours digging through every bit of the Twitter Algorithm.\n\nRead this to 10x your Twitter growth - in 5 minutes:",
    created_at: "Thu Apr 13 13:51:09 +0000 2023",
    favorite_count: 0,
    retweet_count: 0,
    reply_count: 0,
    quote_count: 0,
  }
];

async function main() {
  try {
    for (const tweet of SAMPLE_TWEETS) {
      // Generate embedding for tweet content
      const embedding = await createEmbeddings(tweet.full_text);
      
      // Store tweet data and embedding
      await storeTweet({
        tweet_id: tweet.id_str,
        user_id: tweet.user.id_str,
        username: tweet.user.screen_name,
        content: tweet.full_text,
        created_at: tweet.created_at,
        favorite_count: tweet.favorite_count,
        retweet_count: tweet.retweet_count,
        reply_count: tweet.reply_count,
        quote_count: tweet.quote_count,
        embedding,
      });
    }

    console.log('Successfully processed sample tweets');
    
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
        tweet_id, user_id, username, content, created_at, 
        favorite_count, retweet_count, reply_count, quote_count,
        embedding
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        data.tweet_id,
        data.user_id,
        data.username,
        data.content,
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