import prisma from "./prisma";
import { TDifficulty } from "./randomText";

export const getSentence = async (groupKey: TDifficulty) => {
  return await prisma.sentenceGroup.findUnique({
    where: {
      groupKey,
    },
    include: {
      sentences: true,
    },
  });
};
