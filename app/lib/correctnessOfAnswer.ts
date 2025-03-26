export const correctnessOfAnswer = (
  initialTextLength: number,
  mistakesLength: number
) => {
  const correctness = 100 - (mistakesLength / initialTextLength) * 100;

  return correctness >= 1 ? correctness : 0;
};
