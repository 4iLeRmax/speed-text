import clsx from "clsx";
import React from "react";
import { Line } from "./Line";
import IncorrectLetter from "./IncorrectLetter";
import { LINE_HEIGHT, MARGIN_TOP } from "./Sentence";

type LetterProps = {
  char: string;
  typedLetter: string | undefined;
  isCurrentLetter: boolean;
  lineRef?: React.RefObject<null>;
};

export default function Letter({
  char,
  typedLetter,
  isCurrentLetter,
  lineRef,
}: LetterProps) {
  return (
    <>
      <div
        margin-top={MARGIN_TOP}
        className={clsx("relative", {
          "w-3 h-8": char === " ",
          "text-neutral-600": typedLetter === undefined,
          "text-white": typedLetter !== undefined && char === typedLetter,
          "text-red-600": typedLetter !== undefined && char !== typedLetter,
        })}
        style={{ marginTop: `${MARGIN_TOP}px` }}
      >
        {isCurrentLetter ? <Line variants="working" lineRef={lineRef} /> : null}
        <span>{char}</span>
        <IncorrectLetter expectedLetter={char} currentLetter={typedLetter} />
      </div>
    </>
  );
}
