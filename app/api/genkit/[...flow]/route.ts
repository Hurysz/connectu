import {createApiHandler} from '@genkit-ai/next';
import '@/ai/flows/simple-chat-flow';

export const {GET, POST} = createApiHandler();
