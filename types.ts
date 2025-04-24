export type TMistake = {
  text: string;
  index: number;
  mistakeInSentence: string;
};

export type TResult = {
  correctnessOfAnswer: number;
  WPM: number;
  seconds: number;
  mistakes: TMistake[];
};

declare global {
  interface String {
    countOfWords(): number;
  }
}
