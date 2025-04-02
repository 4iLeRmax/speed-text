import prisma from "@/app/lib/prisma";
import { TDifficulty } from "@/app/lib/randomText";
import { unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const difficulties: TDifficulty[] = ["15", "30", "50", "100", "test"];
  const difficulty = req.nextUrl.searchParams.get("words");

  console.log(difficulty);

  const isTDifficulty = (value: any) => difficulties.includes(value);

  if (difficulty) {
    if (isTDifficulty(difficulty)) {
      const sentences = await prisma.sentenceGroup.findMany({
        where: {
          groupKey: difficulty,
        },
        include: {
          sentences: true,
        },
      });
      return NextResponse.json(sentences[0].sentences);
    }
  }
};
