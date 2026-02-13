'use server';
/**
 * @fileOverview A Genkit flow for suggesting a theme song for a family vacation.
 *
 * - suggestVacationThemeSong - A function that suggests a theme song based on vacation details.
 * - SuggestVacationThemeSongInput - The input type for the suggestVacationThemeSong function.
 * - SuggestVacationThemeSongOutput - The return type for the suggestVacationThemeSong function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestVacationThemeSongInputSchema = z.object({
  vacationName: z.string().describe('The name of the family vacation, e.g., "Gyeongju Family Arcade".'),
  vacationDates: z.string().describe('The dates of the vacation, e.g., "2026.02.15 - 02.17".'),
  vacationDescription: z.string().describe('A brief description of the vacation, highlighting its vibe and purpose.'),
  activities: z.array(z.string()).describe('A list of key activities planned for the vacation.'),
  familyMembers: z.array(z.string()).describe('A list of family members attending, with their roles or personality traits.'),
});
export type SuggestVacationThemeSongInput = z.infer<typeof SuggestVacationThemeSongInputSchema>;

const SuggestVacationThemeSongOutputSchema = z.object({
  songTitle: z.string().describe('The title of the suggested theme song.'),
  artist: z.string().describe('The artist of the suggested theme song.'),
  reason: z.string().describe('A brief explanation of why this song fits the vacation theme.'),
});
export type SuggestVacationThemeSongOutput = z.infer<typeof SuggestVacationThemeSongOutputSchema>;

export async function suggestVacationThemeSong(input: SuggestVacationThemeSongInput): Promise<SuggestVacationThemeSongOutput> {
  return suggestVacationThemeSongFlow(input);
}

const suggestVacationThemeSongPrompt = ai.definePrompt({
  name: 'suggestVacationThemeSongPrompt',
  input: {schema: SuggestVacationThemeSongInputSchema},
  output: {schema: SuggestVacationThemeSongOutputSchema},
  prompt: `You are an expert music curator specializing in recommending theme songs for family vacations.
Your task is to suggest one fun and fitting theme song based on the provided vacation details.

Your response MUST be a valid JSON object that conforms to the output schema.
Do NOT include any introductory text, explanations, or markdown code fences around the JSON.
The JSON object should contain 'songTitle', 'artist', and 'reason'.

Vacation Details:
Vacation Name: {{{vacationName}}}
Vacation Dates: {{{vacationDates}}}
Vacation Description: {{{vacationDescription}}}
Planned Activities:
{{#each activities}}
- {{{this}}}
{{/each}}
Family Members and their roles/traits:
{{#each familyMembers}}
- {{{this}}}
{{/each}}

Consider the overall vibe, planned activities, and the family's dynamic to suggest a song that would enhance their adventure.
The song should be appropriate for a family setting and evoke a feeling of excitement, joy, or camaraderie.`,
});

const suggestVacationThemeSongFlow = ai.defineFlow(
  {
    name: 'suggestVacationThemeSongFlow',
    inputSchema: SuggestVacationThemeSongInputSchema,
    outputSchema: SuggestVacationThemeSongOutputSchema,
  },
  async input => {
    const {output} = await suggestVacationThemeSongPrompt(input);
    return output!;
  }
);
