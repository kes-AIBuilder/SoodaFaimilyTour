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
The JSON object should contain a single key "prompt" with the generated string as its value.

Here are the game types and examples of what to generate:
- 'person': Generate a famous historical figure or celebrity for a "세대격차 인물 퀴즈" (Generation Gap Person Quiz). The person should be well-known enough across generations.
  Examples: "BTS 지민", "나훈아", "아이유", "유재석", "블랙핑크", "임영웅", "아이브", "뉴진스", "심형래", "신구"
- 'word': Generate a four-character Korean word (한글 네 글자) to start a "네 글자 이어말하기" (Four-character Word Chain Game).
  Examples: "와이키키", "경주여행", "설날특집", "가족여행", "온천마을", "보드게임", "스타필드", "진수성찬", "부부싸움", "포토존"
- 'song': Generate a popular Korean song title for a "노래 전주 1초 듣기" (1-second Song Intro Quiz).
  Examples: "아모르파티", "Tell Me", "Dynamite", "내 나이가 어때서", "Hype Boy", "사랑은 아무나 하나", "벚꽃엔딩", "찐이야", "남행열차"
- 'body': Generate a charades prompt (몸으로 말해요) for an action or object.
  Examples: "코끼리 코 돌기", "요리사", "좀비 걸음", "탁구 치기", "세수하기", "경찰관", "사자", "카레 먹기", "낚시하기", "스쿼트"
- 'pitch': Generate a short, challenging Korean phrase for an "절대음감 릴레이" (Absolute Pitch Relay). These should be tongue-twisters or common phrases.
  Examples: "간장공장공장장", "고려구고구려", "경찰청창살", "내가그린기린그림", "철수책상철책상"
- 'eng': Generate a situation or duration for the "훈민정음 (No English)" rule.
  Examples: "식사 끝날 때까지", "수영하는 동안", "다음 이동 시까지", "앞으로 30분간", "오늘 저녁은 영어를 금지합니다"
- 'jc': Generate a family member's role or characteristic for "전지적 참견 시점 (전참시)" (Omniscient Interfering Viewpoint).
  Examples: "장인어른 (조용한 관찰자)", "장모님 (탁구의 고수)", "엄마 (웃음 전도사)", "언수 PD (듬직한 메인 MC)", "다혜 대장 (결단력 있는 ISFP)", "처남 조커 (느림의 미학)"
- 'wake': Generate a morning mission for "기상 미션" (Wake-up Mission).
  Examples: "신발 짝 맞추기", "먼저 씻기", "이불 개기", "아침 인사 하기", "물 1잔 마시기", "단체 사진 준비하기"

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
