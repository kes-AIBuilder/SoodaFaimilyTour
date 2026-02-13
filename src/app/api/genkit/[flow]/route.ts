
import {NextRequest, NextResponse} from 'next/server';
import {generateGamePrompt} from '@/ai/flows/generate-game-prompt';
import {suggestVacationThemeSong} from '@/ai/flows/suggest-vacation-theme-song';

// Define a mapping from flow names to functions
const flowMap = {
  generateGamePrompt,
  suggestVacationThemeSong,
};

export async function POST(
  req: NextRequest,
  {params}: {params: {flow: string}}
) {
  const {flow} = params;
  const body = await req.json();

  // Check if the requested flow exists in the map
  if (flow in flowMap) {
    try {
      // @ts-ignore
      const flowFunction = flowMap[flow];
      const result = await flowFunction(body);
      return NextResponse.json(result);
    } catch (error: any) {
      console.error(`Error executing flow '${flow}':`, error);
      return NextResponse.json(
        {error: `An error occurred: ${error.message}`},
        {status: 500}
      );
    }
  } else {
    // Handle unknown flow names
    return NextResponse.json({error: `Unknown flow: ${flow}`}, {status: 404});
  }
}
