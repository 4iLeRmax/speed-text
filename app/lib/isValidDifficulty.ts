import { EDifficulty, TDifficulty } from "./getRandomSentence";

export const isValidDifficulty = (difficulty: string | null) => {
  const difficulties = Object.values(EDifficulty);

  return difficulties.includes(difficulty as TDifficulty);
};
