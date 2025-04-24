import { TResult } from "@/types";
import clsx from "clsx";
import React from "react";

type ResultingStatisticsProps = {
  result: TResult;
};

export default function ResultingStatistics({
  result,
}: ResultingStatisticsProps) {
  return (
    <>
      <div
        className={clsx("text-center flex flex-col rounded-md relative", {
          "text-green-500 ": result.correctnessOfAnswer >= 90,
          "text-yellow-500":
            result.correctnessOfAnswer >= 70 && result.correctnessOfAnswer < 90,
          "text-red-500": result.correctnessOfAnswer < 70,
        })}
      >
        Correctness of answer:
        <span
          after-dynamic-value={result.correctnessOfAnswer.toFixed(2) + "%"}
          className={clsx(
            "text-2xl font-semibold relative cursor-pointer",

            "hover:after:content-[attr(after-dynamic-value)] hover:after:px-5 hover:after:py-2",
            "hover:after:absolute hover:after:top-[calc(120%_+_0px)] hover:after:left-1/2 hover:after:-translate-x-1/2",
            "hover:after:bg-neutral-900/80 hover:after:backdrop-blur-sm hover:after:text-sm hover:after:text-neutral-600 hover:after:text-center hover:after:rounded-md",

            "hover:before:absolute hover:before:top-[calc(120%_-_8px)] hover:before:left-1/2 hover:before:-translate-x-1/2",
            "hover:before:border-solid hover:before:border-b-neutral-900/80 hover:before:backdrop-blur-sm hover:before:border-b-8 hover:before:border-x-transparent hover:before:border-x-8 hover:before:border-t-0"
          )}
        >
          {Math.round(result.correctnessOfAnswer)} %
        </span>
      </div>
      <div className="flex items-center justify-evenly mb-3">
        <h1 className="text-center">WPM: {result.WPM}</h1>
        <h1 className="text-center">Time: {result.seconds}s</h1>
        <h1 className="text-center">Mistakes: {result.mistakes.length}</h1>
      </div>
    </>
  );
}
