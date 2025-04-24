import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json(await prisma.sentenceGroup.findMany());
};
