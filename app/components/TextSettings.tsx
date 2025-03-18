import React from "react";
import { EDifficulty, TDifficulty } from "../lib/randomText";
import clsx from "clsx";

export default function TextSettings({
  difficulty,
  setDifficulty,
  reset,
  testText = false,
}: {
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<TDifficulty>>;
  reset: () => void;
  testText?: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-2 text-sm bg-neutral-900 text-neutral-600 px-5 py-2 rounded-md">
        <div>Words:</div>
        <div className="flex items-center gap-2">
          {Object.values(EDifficulty)
            .filter((el) => (!testText ? el != "test" : el))
            .map((el) => (
              <button
                key={el}
                className={clsx("", {
                  "text-yellow-500": difficulty === el,
                })}
                onClick={() => {
                  setDifficulty(el);
                  reset();
                }}
                disabled={el === "60" || el === "120"}
              >
                {el}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
