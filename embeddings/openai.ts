import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

export default openai;


export async function createEmbeddings(
  input: string | Array<string> | Array<number> | Array<Array<number>>,
) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input,
  });

  return response.data.map((item) => item.embedding);
}