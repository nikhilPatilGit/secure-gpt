import { Ollama } from 'langchain/llms/ollama';

const ollama = new Ollama({
  baseUrl: 'http://localhost:11434', // Default value
  model: 'llama2', // Default value
});

const processText = async (text: string): Promise<string> => {
  const stream = await ollama.stream(text);

  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return chunks.join('');
};

export const useOllama = () => {
  return {
    processText,
  };
};
