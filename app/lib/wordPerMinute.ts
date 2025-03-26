export const wordPerMinute = (initialText: string, mls: number) => {
  const words = initialText.split(" ").length;
  const seconds = mls / 1000;
  return Math.round((words / seconds) * 60);
};
