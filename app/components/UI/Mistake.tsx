import { TMistake } from "@/types";
import clsx from "clsx";
import React from "react";

type MistakeProps = {
  initialText: string;
  mistake: TMistake;
};

export default function Mistake({ initialText, mistake }: MistakeProps) {
  const goodLookingMistake = (mistake: TMistake) => {
    const sentence = mistake.mistakeInSentence;
    const indexOfMistake = sentence.indexOf("_");
    const firstIndexOfMistake = indexOfMistake - 10;
    const secondIndexOfMistake = indexOfMistake + 10;

    return `${firstIndexOfMistake <= 0 ? "" : "..."}${sentence.slice(
      firstIndexOfMistake <= 0 ? 0 : firstIndexOfMistake,
      secondIndexOfMistake >= mistake.mistakeInSentence.length
        ? mistake.mistakeInSentence.length
        : secondIndexOfMistake
    )}${secondIndexOfMistake >= mistake.mistakeInSentence.length ? "" : "..."}`;
    // return mistake.mistakeInSentence;
  };

  const mistakeOrTypo = () => {
    const expectedLetter = initialText[mistake.index];

    if (expectedLetter === mistake.text) {
      return `typo on the '${
        expectedLetter === " " ? "space" : expectedLetter
      }'`;
    } else if (expectedLetter !== mistake.text) {
      return `expected '${
        expectedLetter === " " ? "space" : expectedLetter
      }' but got '${mistake.text}'`;
    }
  };

  return (
    <>
      <div
        after-dynamic-value={mistakeOrTypo()}
        className={clsx(
          "bg-red-400 text-red-700 border-l-2 border-red-700 font-bold px-2 flex items-center justify-between relative cursor-pointer",

          "hover:before:absolute hover:before:top-full hover:before:left-1/2 hover:before:-translate-x-1/2 hover:before:z-20",
          "hover:before:border-solid hover:before:border-b-neutral-900/90 hover:before:border-b-8 hover:before:border-x-transparent hover:before:border-x-8 hover:before:border-t-0",

          "hover:after:content-[attr(after-dynamic-value)] hover:after:px-5 hover:after:py-2",
          "hover:after:absolute hover:after:top-[calc(100%_+_8px)] hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:z-20",
          "hover:after:bg-neutral-900/90 hover:after:text-sm hover:after:text-neutral-600 hover:after:text-center hover:after:rounded-md"
        )}
      >
        <div>{goodLookingMistake(mistake)}</div>
        <div className="underline">at index: {mistake.index}</div>
      </div>
    </>
  );
}
