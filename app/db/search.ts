/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEmbeddings } from "@/app/embeddings/openai";
import { dbClient } from "./turso";

export type SearchResult = {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  favoriteCount: number;
  retweetCount: number;
  replyCount: number;
  quoteCount: number;
  similarity: number;
};

export async function semanticSearch(query: string): Promise<SearchResult[]> {
  try {
    // Generate embedding for search query
    const queryEmbedding = await createEmbeddings(query);

    // Search tweets table using cosine similarity
    const result = await dbClient.execute({
      sql: `
        SELECT 
          tweet_id,
          user_id,
          username,
          content,
          created_at,
          favorite_count,
          retweet_count,
          reply_count,
          quote_count,
          1 - vector_distance_cos(embedding, vector32(?)) as similarity
        FROM tweets
        ORDER BY similarity DESC
        LIMIT 12;
      `,
      args: [new Float32Array(queryEmbedding).buffer as ArrayBuffer]
    });

    // Map results to strongly typed objects
    return result.rows.map((row: any) => ({
      id: row.tweet_id,
      userId: row.user_id,
      username: row.username,
      content: row.content,
      createdAt: row.created_at,
      favoriteCount: row.favorite_count,
      retweetCount: row.retweet_count,
      replyCount: row.reply_count,
      quoteCount: row.quote_count,
      similarity: row.similarity
    }));

  } catch (error) {
    console.error("Error performing semantic search:", error);
    throw error;
  }
}

export async function textSearch(query: string): Promise<SearchResult[]> {
  try {
    // Search tweets table using LIKE for text matching
    const result = await dbClient.execute({
      sql: `
        SELECT 
          tweet_id,
          user_id,
          username,
          content,
          created_at,
          favorite_count,
          retweet_count,
          reply_count,
          quote_count,
          1 as similarity
        FROM tweets
        WHERE content LIKE ?
        LIMIT 10;
      `,
      args: [`%${query}%`]
    });

    // Map results to strongly typed objects
    return result.rows.map((row: any) => ({
      id: row.tweet_id,
      userId: row.user_id,
      username: row.username,
      content: row.content,
      createdAt: row.created_at,
      favoriteCount: row.favorite_count,
      retweetCount: row.retweet_count,
      replyCount: row.reply_count,
      quoteCount: row.quote_count,
      similarity: row.similarity
    }));

  } catch (error) {
    console.error("Error performing text search:", error);
    throw error;
  }
}
