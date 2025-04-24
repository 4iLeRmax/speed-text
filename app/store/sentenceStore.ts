import { create } from "zustand";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { TDifficulty } from "../lib/getRandomSentence";
import sentence from "../lib/sentence";

type TSentenceGroup = Prisma.SentenceGroupGetPayload<{}>;
type TSentence = Prisma.SentenceGetPayload<{}>;

type TSentenceStore = {
  sentenceGroupsKey: string[];
  sentenceGroups: { [TDifficulty: string]: string[] };
  fetchSentenceGroupsKey: () => Promise<void>;
  fetchSentencesByGroupKey: (groupKey: TDifficulty) => Promise<void>;
  getSentencesByCroupKey: (groupKey: TDifficulty) => string[];
};

const { getSentenceGroups, getSentencesByGroupKey } = sentence;

export const useSentenceStore = create<TSentenceStore>((set, get) => ({
  sentenceGroupsKey: [],
  sentenceGroups: {},

  fetchSentenceGroupsKey: async () => {
    const groups: TSentenceGroup[] = await getSentenceGroups();
    const groupsKey = groups.map((group) => group.groupKey);

    set({ sentenceGroupsKey: groupsKey });
  },
  fetchSentencesByGroupKey: async (groupKey: TDifficulty) => {
    const existSentenceGroup = get().sentenceGroups[groupKey];

    if (!existSentenceGroup) {
      const sentences = await getSentencesByGroupKey(groupKey);
      const sentencesText = sentences.map((el) => el.text);

      set((state) => ({
        sentenceGroups: {
          ...state.sentenceGroups,
          [groupKey]: sentencesText,
        },
      }));
    }
  },
  getSentencesByCroupKey: (groupKey: TDifficulty) => {
    return get().sentenceGroups[groupKey];
  },
}));
