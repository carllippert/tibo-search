import { NextResponse } from 'next/server';
import { createEmbeddings } from '@/embeddings/openai';

export async function GET() {
  try {
    const embedding = await createEmbeddings(
      'The quick brown fox jumps over the lazy dog',
    );

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
