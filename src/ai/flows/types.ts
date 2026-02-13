
export type GameType =
  | 'person'
  | 'word'
  | 'song'
  | 'body'
  | 'pitch'
  | 'eng'
  | 'jc'
  | 'wake';

export interface GenerateGamePromptInput {
  gameType: GameType;
  previousPrompts?: string[];
}

export interface GenerateGamePromptOutput {
  prompt: string;
}

export interface SuggestVacationThemeSongInput {
  vacationName: string;
  vacationDates: string;
  vacationDescription: string;
  activities: string[];
  familyMembers: string[];
}

export interface SuggestVacationThemeSongOutput {
  songTitle: string;
  artist: string;
  reason: string;
}
