import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export default openai;


export async function createEmbeddings(input: string): Promise<number[]> {
  console.log("Creating embeddings for input", input);

  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input,
  });

  console.log("Embedding response", response);

  return response.data[0].embedding;
}
