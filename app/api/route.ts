import { NextResponse } from 'next/server';
import { createEmbeddings } from '@/app/embeddings/openai';

export async function GET() {
  try { 
    // const embedding = await createEmbeddings(
    //   'The quick brown fox jumps over the lazy dog',
    // );

    console.log(embedding);

    return NextResponse.json({ embedding });

  } catch (error) {
    console.error('Error generating embedding:', error);
    return NextResponse.json(
      { error: 'Failed to generate embedding' },
      { status: 500 }
    );
  }
}


const batchSize = 50;

async function storeEmbeddings(embeddings: number[][]) {
  for (let i = 0; i < embeddings.length; i += batchSize) {
    const batch = embeddings.slice(i, i + batchSize).map((embedding) => ({
      sql: `INSERT INTO documents (embedding) VALUES (?)`,
      args: [new Float32Array(embedding).buffer as ArrayBuffer],
    }));

    try {
      await db.batch(batch);
      console.log(`Stored embeddings ${i + 1} to ${i + batch.length}`);
    } catch (error) {
      console.error(
        `Error storing batch ${i + 1} to ${i + batch.length}:`,
        error,
      );
    }
  }
}