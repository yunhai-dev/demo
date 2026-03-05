'use server';
/**
 * @fileOverview An AI agent that answers questions based on provided knowledge base context.
 *
 * - contextualAIQuestionAnswering - A function that handles the AI question answering process.
 * - ContextualAIQuestionAnsweringInput - The input type for the contextualAIQuestionAnswering function.
 * - ContextualAIQuestionAnsweringOutput - The return type for the contextualAIQuestionAnswering function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextualAIQuestionAnsweringInputSchema = z.object({
  question: z.string().describe('The user\'s question.'),
  context: z.array(z.string()).describe('An array of knowledge base document snippets relevant to the question.'),
});
export type ContextualAIQuestionAnsweringInput = z.infer<typeof ContextualAIQuestionAnsweringInputSchema>;

const ContextualAIQuestionAnsweringOutputSchema = z.string().describe('The AI-generated answer based on the provided context.');
export type ContextualAIQuestionAnsweringOutput = z.infer<typeof ContextualAIQuestionAnsweringOutputSchema>;

export async function contextualAIQuestionAnswering(input: ContextualAIQuestionAnsweringInput): Promise<ContextualAIQuestionAnsweringOutput> {
  return contextualAIQuestionAnsweringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextualAIQuestionAnsweringPrompt',
  input: {schema: ContextualAIQuestionAnsweringInputSchema},
  output: {schema: ContextualAIQuestionAnsweringOutputSchema},
  prompt: `You are an expert assistant for a knowledge base system. Your goal is to answer the user's question accurately and concisely, strictly using only the provided context. If the answer cannot be found within the given context, state that you don't have enough information to answer the question.

Context:
{{#each context}}
Document snippet:
{{{this}}}

{{/each}}

Question: {{{question}}}

Answer:`,
});

const contextualAIQuestionAnsweringFlow = ai.defineFlow(
  {
    name: 'contextualAIQuestionAnsweringFlow',
    inputSchema: ContextualAIQuestionAnsweringInputSchema,
    outputSchema: ContextualAIQuestionAnsweringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
