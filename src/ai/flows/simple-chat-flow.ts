'use server';
/**
 * @fileOverview A simple chat flow that responds to user input.
 *
 * - simpleChat - A function that handles the chat interaction.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// No input schema needed for this simple flow, we'll just take a string.

export const simpleChatFlow = ai.defineFlow(
  {
    name: 'simpleChatFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      config: {
        // Just a simple example, low temperature for more predictable responses
        temperature: 0.2, 
      }
    });

    return llmResponse.text;
  }
);
