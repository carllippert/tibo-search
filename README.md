# Just Search

## Limitations - Improvements

- Only 200 tweets in db so not a lot of data so vector search kinda not amazingly accurate feeling
- Unsure of vector search speed on larger datasets on Turso or other Sqlite Vector DB Extensions
- Tweets with rich media are not currently included essentially ( image context not vectorized)
  - Could have AI generate good image descriptions and vectorize them so we can search on them
- Might be good to only show results that are "Very Close" to the query vs just the 10 closest
  -> In long tail searches in a smallish dataset you see a bunch of stuff that is not very relevant

## Stack:

[Vector DB via Sqlite using Turso](https://docs.turso.tech/features/ai-and-embeddings)

- You probably don't need some proprietary vector db solution with a big price tag. 

- Have wanted to use Turso Sqlite for a different project and also like open source db solutions when I can so wanted to test using them as a vector db vs more well known options.

- They are interesting because their whole schtick is to create a sqlite db per user/org and I think it could be useful for a bunch of different projects in AI and a setup I haven't tried before.

ShadCN

- Fast Simple UI Option

MagicUI

- A Shiny Search Button

OpenAI

- The easiest path to embeddings. Didn't want to try anything new here but other options can be explored to reduce dependency or costs depending on volume

## Data:

- 200 tweets scraped from ElonMusk and Tibo_Maker via Apify. ( Simple & Fast option for a little hack )
- Stored in JSONL format in repo
- Basic Text Cleaning Before Embedding for better results
- Short script to create embeddings and store in Turso Sqlite Vector DB

## Personal Amplification Tools

- Cursor AI + Claude 3.5


