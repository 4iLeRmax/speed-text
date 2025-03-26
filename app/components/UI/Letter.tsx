import clsx from "clsx";
import React from "react";
import { Line } from "./Line";
import IncorrectLetter from "./IncorrectLetter";

type LetterProps = {
  char: string;
  typedLetter: string | undefined;
  isCurrentLetter: boolean;
};

export default function Letter({
  char,
  typedLetter,
  isCurrentLetter,
}: LetterProps) {
  return (
    <>
      <div
        className={clsx("relative", {
          "w-3 h-8": char === " ",
          "text-neutral-600": typedLetter === undefined,
          "text-white": typedLetter !== undefined && char === typedLetter,
          "text-red-600": typedLetter !== undefined && char !== typedLetter,
        })}
      >
        {isCurrentLetter ? <Line variants="working" /> : null}
        <span>{char}</span>
        <IncorrectLetter expectedLetter={char} currentLetter={typedLetter} />
      </div>
    </>
  );
}
