"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useState } from "react";
import { dbClient } from "@/app/db/turso";

type Tweet = {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  favoriteCount: number;
  retweetCount: number;
  replyCount: number;
  quoteCount: number;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const result = await dbClient.execute("SELECT * FROM tweets");
      const dbTweets = result.rows.map((row: any) => ({
        id: row.tweet_id,
        userId: row.user_id,
        username: row.username,
        content: row.content,
        createdAt: row.created_at,
        favoriteCount: row.favorite_count,
        retweetCount: row.retweet_count,
        replyCount: row.reply_count,
        quoteCount: row.quote_count
      }));
      setSearchResults(dbTweets);
    } catch (error) {
      console.error("Error searching tweets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-2xl">
        <div className="flex items-center gap-8 mb-8">
          <Image
            className="rounded-full overflow-hidden"
            src="/tibo.jpg"
            alt="Tibo logo"
            width={120}
            height={120}
            priority
          />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            The Search Begins
          </h1>
        </div>

        <div className="flex w-full gap-2 h-10">
          <Input
            type="search"
            placeholder="Search..."
            className="flex-1 h-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <RainbowButton
            className="h-full"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search for Inspiration"}
          </RainbowButton>
        </div>

        {searchResults.length > 0 && (
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="space-y-4">
              {searchResults.map((tweet) => (
                <div key={tweet.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div>
                      <p className="font-semibold">@{tweet.username}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(tweet.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="mb-2">{tweet.content}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>❤️ {tweet.favoriteCount}</span>
                    <span>🔄 {tweet.retweetCount}</span>
                    <span>💬 {tweet.replyCount}</span>
                    <span>🔁 {tweet.quoteCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-muted-foreground">
        <a
          className="hover:text-foreground transition-colors"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
        <a
          className="hover:text-foreground transition-colors"
          href="https://github.com/vercel/next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer> */}
    </div>
  );
}
