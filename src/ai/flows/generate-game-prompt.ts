'use server';
/**
 * @fileOverview A Genkit flow for dynamically generating game prompts for various family arcade games.
 *
 * - generateGamePrompt - A function that generates a game prompt based on the game type.
 * - GenerateGamePromptInput - The input type for the generateGamePrompt function.
 * - GenerateGamePromptOutput - The return type for the generateGamePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GameTypeSchema = z.enum([
  'person',
  'word',
  'song',
  'body',
  'pitch',
  'eng',
  'wake',
]);

const GenerateGamePromptInputSchema = z.object({
  gameType: GameTypeSchema.describe('The type of game for which to generate a prompt.'),
  previousPrompts: z
    .array(z.string())
    .optional()
    .describe('An array of previously generated prompts to avoid duplication.'),
});
export type GenerateGamePromptInput = z.infer<typeof GenerateGamePromptInputSchema>;

const GenerateGamePromptOutputSchema = z.object({
  prompt: z.string().describe('The dynamically generated game prompt.'),
});
export type GenerateGamePromptOutput = z.infer<typeof GenerateGamePromptOutputSchema>;

export async function generateGamePrompt(
  input: GenerateGamePromptInput
): Promise<GenerateGamePromptOutput> {
  return generateGamePromptFlow(input);
}

const promptDefinition = ai.definePrompt({
  name: 'generateGamePromptDefinition',
  input: {schema: GenerateGamePromptInputSchema},
  output: {schema: GenerateGamePromptOutputSchema},
  prompt: `You are an AI assistant that generates creative and engaging prompts for a Korean family arcade game.
The participants include people in their 20s, 30s, 40s, and 60s. Your prompts MUST be mainstream and popular, focusing on topics familiar to Koreans in their 60s, but also recognizable by younger generations.

Your response MUST be a valid JSON object that adheres to the output schema.
Do NOT include any introductory text, explanations, or markdown code fences around the JSON.
The JSON object should contain only a "prompt" key.

Here are the game types and specific instructions:
- 'person': Generate the name of a very famous celebrity or historical figure. The person MUST be a household name in Korea, well-known to all generations (e.g., legendary singers, top actors/actresses, historical figures from textbooks).
  Examples: { "prompt": "나훈아" }, { "prompt": "김혜자" }, { "prompt": "이순신" }

- 'word': Generate a common, everyday four-character Korean word as a fill-in-the-blank quiz. Randomly replace two of the characters with 'O'. The word must be easy and universally known.
  Examples: { "prompt": "천생OO" } (Answer: 연분), { "prompt": "OO만세" } (Answer: 대한민국)

- 'song': Generate a very popular Korean song title. Include a mix of modern mega-hits and legendary older songs (70s-90s ballads, trot, etc.) that everyone would know.
  Examples: { "prompt": "아파트" }, { "prompt": "Gee" }, { "prompt": "붉은 노을" }

- 'body': Generate a charades prompt. The prompt MUST be a single, common, easy-to-act-out NOUN (명사).
  Examples: { "prompt": "소방차" }, { "prompt": "나무늘보" }, { "prompt": "피아노" }

- 'pitch': Generate a short, humorously difficult-to-pronounce Korean phrase for an "절대음감 릴레이". It should be challenging but fun.
  Examples: { "prompt": "경찰청 쇠창살 외철창살" }, { "prompt": "저기 저 뜀틀이 내가 뛸 뜀틀인가" }

- 'eng': Generate a situation for the "훈민정음 (No English)" rule. With a low probability (around 10%), add a penalty multiplier like '(벌금 x2)' or '(벌금 x5)' to the end of the prompt.
  Examples: { "prompt": "설거지 끝날 때까지" }, { "prompt": "다음 게임 1라운드 동안 (벌금 x2)" }

- 'wake': Generate a very simple, fun morning mission.
  Examples: { "prompt": "가족 중 한 명에게 사랑한다고 말하기" }, { "prompt": "가장 먼저 양치하기" }


Ensure the prompt is fresh and not a duplicate of any 'previousPrompts' provided.

Game Type: {{{gameType}}}
{{#if previousPrompts}}
Avoid generating any of these previous prompts: {{previousPrompts}}
{{/if}}`,
});

const generateGamePromptFlow = ai.defineFlow(
  {
    name: 'generateGamePromptFlow',
    inputSchema: GenerateGamePromptInputSchema,
    outputSchema: GenerateGamePromptOutputSchema,
  },
  async input => {
    const {output} = await promptDefinition(input);
    return output!;
  }
);
