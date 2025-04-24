import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ words: string }> }
) => {
  const sentenceGroups = await prisma.sentenceGroup.findMany({
    include: {
      sentences: true,
    },
  });

  const { words: selectedDifficulty } = await params;
  const difficulties = sentenceGroups.map((el) => el.groupKey);

  const isTDifficulty = (value: any) => difficulties.includes(value);

  if (isTDifficulty(selectedDifficulty)) {
    const sentences = sentenceGroups.find(
      (el) => el.groupKey === selectedDifficulty
    );

    if (!!sentences) {
      return NextResponse.json(sentences.sentences || []);
    }
  }
};
