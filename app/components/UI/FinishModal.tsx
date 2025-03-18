import React from "react";
import { TResult } from "../SpeedText";

export default function FinishModal({
  isOpen,
  results,
  reset,
}: {
  isOpen: boolean;
  results: TResult;
  reset: () => void;
}) {
  return (
    <>
      {isOpen ? (
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[400px] h-[250px] rounded-xl bg-neutral-700 flex flex-col gap-2 px-5 py-10">
            <h1 className="text-center">
              Correctness of answer {results.correctnessOfAnswer} %
            </h1>
            <h1 className="text-center">WPM: {results.WPM}</h1>
            <h1 className="text-center">Time: {results.seconds}s</h1>
            <button
              className="bg-yellow-500 w-2/3 block mx-auto rounded-md py-1.5"
              onClick={reset}
            >
              Restart
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
