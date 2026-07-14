import { TDifficulty } from "./getRandomSentence";

type SentenceGroups = {
  id: string;
  groupKey: string;
};
type SentencesForGroup = {
  id: string;
  text: string;
  sentenceGroupId: string;
};

const getSentenceGroups = async (): Promise<SentenceGroups[]> => {
  return await fetch(`http://localhost:3000/api/sentenceGroups`).then((res) =>
    res.json(),
  );
};

const getSentencesByGroupKey = async (
  groupKey: TDifficulty,
): Promise<SentencesForGroup[]> => {
  return await fetch(`http://localhost:3000/api/sentences/${groupKey}`).then(
    (res) => res.json(),
  );
};

const sentence = {
  getSentenceGroups,
  getSentencesByGroupKey,
};

export default sentence;
