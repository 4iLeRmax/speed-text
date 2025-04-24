import { TMistake } from "@/types";
import clsx from "clsx";
import React from "react";
import Mistake from "./UI/Mistake";

type MistakesListProps = {
  initialText: string;
  mistakes: TMistake[];
};

export default function MistakesList({
  initialText,
  mistakes,
}: MistakesListProps) {
  return (
    <>
      <div
        className={clsx("flex flex-col gap-0.5", {
          "overflow-y-scroll h-[102px]": mistakes.length > 4,
        })}
      >
        {mistakes.map((mistake, i) => (
          <Mistake key={i} mistake={mistake} initialText={initialText} />
        ))}
      </div>
    </>
  );
}
