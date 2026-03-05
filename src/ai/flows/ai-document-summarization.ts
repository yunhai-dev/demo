'use server';
/**
 * @fileOverview This file implements a Genkit flow for summarizing documents or conversations.
 *
 * - aiDocumentSummarization - A function that handles the document summarization process.
 * - AIDocumentSummarizationInput - The input type for the aiDocumentSummarization function.
 * - AIDocumentSummarizationOutput - The return type for the aiDocumentSummarization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDocumentSummarizationInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the documents or conversation to be summarized.'),
});
export type AIDocumentSummarizationInput = z.infer<
  typeof AIDocumentSummarizationInputSchema
>;

const AIDocumentSummarizationOutputSchema = z.object({
  summary: z.string().describe('The concise and accurate summary of the content.'),
});
export type AIDocumentSummarizationOutput = z.infer<
  typeof AIDocumentSummarizationOutputSchema
>;

export async function aiDocumentSummarization(
  input: AIDocumentSummarizationInput
): Promise<AIDocumentSummarizationOutput> {
  return aiDocumentSummarizationFlow(input);
}

const aiDocumentSummarizationPrompt = ai.definePrompt({
  name: 'aiDocumentSummarizationPrompt',
  input: {schema: AIDocumentSummarizationInputSchema},
  output: {schema: AIDocumentSummarizationOutputSchema},
  prompt: `You are an expert summarizer. Your task is to provide a concise and accurate summary of the given content. Focus on the main points and key information.

Content to summarize:
```
{{{documentContent}}}
```

Please provide the summary in the 'summary' field.`,
});

const aiDocumentSummarizationFlow = ai.defineFlow(
  {
    name: 'aiDocumentSummarizationFlow',
    inputSchema: AIDocumentSummarizationInputSchema,
    outputSchema: AIDocumentSummarizationOutputSchema,
  },
  async (input) => {
    const {output} = await aiDocumentSummarizationPrompt(input);
    return output!;
  }
);
