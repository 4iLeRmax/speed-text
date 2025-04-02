import { create } from "zustand";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { TDifficulty } from "../lib/randomText";

type TSentenceGroup = Prisma.SentenceGroupGetPayload<{}>;
type TSentence = Prisma.SentenceGetPayload<{}>;

// type TSentenceStore = {
//   sentenceGroup: TSentenceGroup;
//   sentences: TSentence[];
//   fetchSentenceGroup: () => Promise<void>;
// };

type TSentenceStore = {
  sentenceGroup: TDifficulty;
  sentences: string[];
  fetchSentenceGroup: () => Promise<void>;
};

export const useSentenceStore = create<TSentenceStore>((set, get) => ({
  sentenceGroup: "15",
  sentences: [],

  fetchSentenceGroup: async () => {
    const groups = await prisma.sentenceGroup.findMany({});
  },
}));
