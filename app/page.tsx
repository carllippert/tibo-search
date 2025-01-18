/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { useState } from "react";
import { SearchResult } from "@/app/db/search";
import { Tweet } from "react-tweet";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error("Search request failed");
      }
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching tweets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center w-full max-w-7xl">
        <div className="flex flex-col items-center gap-4 sm:gap-8 mb-4 sm:mb-8 text-center sm:text-left">
          <h1 className="scroll-m-20 text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl">
            Just Search
          </h1>
          <div className="text-sm text-muted-foreground">
            because "one more feature" is the path to failure
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full max-w-2xl mx-auto gap-2">
          <Input
            type="search"
            placeholder="Search 'Startups', 'Rockets', 'AI'..."
            className="flex-1 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <RainbowButton
            className="h-10 w-full sm:w-auto"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </RainbowButton>
        </div>

        {searchResults.length > 0 && (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {searchResults.map((tweet) => (
                <Tweet key={tweet.id} id={tweet.id} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-muted-foreground">
        <a
          className="hover:text-foreground transition-colors"
          href="https://github.com/carllippert/tibo-search"
          target="_blank"
          rel="noopener noreferrer"
        >
          Readme
        </a>
        <a
          className="hover:text-foreground transition-colors"
          href="https://twitter.com/carllippert"
          target="_blank"
          rel="noopener noreferrer"
        >
          By Carl Lippert
        </a>
      </footer>
    </div>
  );
}
