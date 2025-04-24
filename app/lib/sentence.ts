import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { TDifficulty } from "./getRandomSentence";

type SentenceGroups = Prisma.SentenceGroupGetPayload<{}>;
type SentencesForGroup = Prisma.SentenceGetPayload<{}>;

const getSentenceGroups = async (): Promise<SentenceGroups[]> => {
  return await fetch(`http://localhost:3000/api/sentenceGroups`).then((res) =>
    res.json()
  );
};

const getSentencesByGroupKey = async (
  groupKey: TDifficulty
): Promise<SentencesForGroup[]> => {
  return await fetch(`http://localhost:3000/api/sentences/${groupKey}`).then(
    (res) => res.json()
  );
};

const sentence = {
  getSentenceGroups,
  getSentencesByGroupKey,
};

export default sentence;
