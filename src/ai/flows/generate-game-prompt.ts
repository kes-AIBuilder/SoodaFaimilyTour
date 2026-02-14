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
  'jc',
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
  imageUrl: z.string().optional().describe('An optional URL for an image related to the prompt, especially for the person quiz.'),
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
  prompt: `You are an AI assistant that generates creative and engaging prompts for family arcade games.
Your task is to generate a game prompt based on the provided 'gameType'.

Your response MUST be a valid JSON object that adheres to the output schema.
Do NOT include any introductory text, explanations, or markdown code fences around the JSON.
The JSON object should contain a "prompt" key, and optionally an "imageUrl" key.

Here are the game types and examples of what to generate:
- 'person': Generate a famous historical figure or celebrity for a "세대격차 인물 퀴즈". The person should be well-known enough across generations.
  Your response MUST include both the person's name in the "prompt" field and a REAL, publicly accessible, representative image URL in the "imageUrl" field. Prioritize sources like Wikimedia Commons or Wikipedia.
  Examples: 
  { "prompt": "아이유", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/180901_IU_at_Incheon_Airport.jpg/800px-180901_IU_at_Incheon_Airport.jpg" }
  { "prompt": "유재석", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/20070801104007_5_728_1040.jpg/220px-20070801104007_5_728_1040.jpg" }

- 'word': Generate a four-character Korean word (한글 네 글자) as a fill-in-the-blank quiz. Randomly replace two of the characters with 'O'. The word should be common and suitable for a family game.
  Examples: 
  { "prompt": "대한OO" } (Answer: 민국)
  { "prompt": "OO민국" } (Answer: 대한)
  { "prompt": "유명O실" } (Answer: 무)
  { "prompt": "OO사위" } (Answer: 백년)

- 'song': Generate a popular Korean song title for a "노래 전주 1초 듣기" (1-second Song Intro Quiz).
  Examples: { "prompt": "아모르파티" }, { "prompt": "Tell Me" }, { "prompt": "Dynamite" }

- 'body': Generate a charades prompt (몸으로 말해요) for an action or object.
  Examples: { "prompt": "코끼리 코 돌기" }, { "prompt": "요리사" }, { "prompt": "좀비 걸음" }

- 'pitch': Generate a short, challenging Korean phrase for an "절대음감 릴레이" (Absolute Pitch Relay).
  Examples: { "prompt": "간장공장공장장" }, { "prompt": "고려구고구려" }, { "prompt": "경찰청창살" }

- 'eng': Generate a situation or duration for the "훈민정음 (No English)" rule.
  Examples: { "prompt": "식사 끝날 때까지" }, { "prompt": "수영하는 동안" }, { "prompt": "앞으로 30분간" }

- 'jc': Generate a family member's role or characteristic for "전지적 참견 시점 (전참시)".
  Examples: { "prompt": "장인어른 (조용한 관찰자)" }, { "prompt": "장모님 (탁구의 고수)" }

- 'wake': Generate a morning mission for "기상 미션".
  Examples: { "prompt": "신발 짝 맞추기" }, { "prompt": "먼저 씻기" }, { "prompt": "이불 개기" }


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
