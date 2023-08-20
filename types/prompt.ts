import { OpenAIModel } from './openai';

export interface Prompt {
  id: string;
  name: string;
  description: string;
  entities: string;
  content: string;
  model: OpenAIModel;
  folderId: string | null;
}
