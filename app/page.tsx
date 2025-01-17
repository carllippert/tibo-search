"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useState } from "react";
import { tweets, Tweet } from "./fake-tweets";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get 4 random tweets
      const shuffled = [...tweets].sort(() => 0.5 - Math.random());
      const randomTweets = shuffled.slice(0, 4);

      setSearchResults(randomTweets);
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
          <h1 className="text-4xl font-bold">The Search Begins</h1>
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
                    <img
                      src={tweet.author.avatar}
                      alt={tweet.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{tweet.author.name}</p>
                      <p className="text-sm text-gray-500">
                        @{tweet.author.username}
                      </p>
                    </div>
                  </div>
                  <p className="mb-2">{tweet.text}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>❤️ {tweet.likes}</span>
                    <span>🔄 {tweet.retweets}</span>
                    <span>💬 {tweet.replies}</span>
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
