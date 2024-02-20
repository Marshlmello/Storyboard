const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export async function POST(request) {
  const { prompt, number } = await request.json();

  const response = await openai.createImage({
    prompt: prompt,
    n: number,
    size: "256x256",
  });

  return new Response(JSON.stringify({ data: response.data.data }));
}
