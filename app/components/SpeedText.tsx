"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { getRandomText, TDifficulty } from "../lib/randomText";

import { Line } from "./UI/Line";
import { ResetButton } from "./UI/ResetButton";
import FinishModal from "./UI/FinishModal";
import TextSettings from "./TextSettings";
import { AnimatePresence } from "motion/react";

export type TResult = {
  correctnessOfAnswer: number;
  WPM: number;
  seconds: number;
};

export default function TempSpeedText() {
  const [difficulty, setDifficulty] = useState<TDifficulty>("15");
  const [initialText, setInitialText] = useState(getRandomText(difficulty));
  const [typedText, setTypedText] = useState("");

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mistakes, setMistakes] = useState<
    { text: string; index: number; mistakeInSentence: string }[]
  >([]);
  const [mouseMove, setMouseMove] = useState(false);

  //TODO: upgrade popup window

  //NOTE: if you click "space" then you move to the next word and count missed letters and each missed word is new mistake
  // ??? if (typed value === ' ' and word from initial text is not full typed then) {
  //   we skip word and skip 'space' and move to the next word
  //}
  //NOTE ???: if your last typed word is correct we can't erase it after "space" but if it has typo then we can erase it

  const typoCatching = (
    prevValue: string,
    currentValue: string,
    lastTypedValue: string,
    indexOfLastTypedValue: number
  ) => {
    if (
      prevValue.length < currentValue.length &&
      lastTypedValue !== initialText[indexOfLastTypedValue]
    ) {
      setMistakes((p) => [
        ...p,
        {
          text: initialText[indexOfLastTypedValue],
          index: indexOfLastTypedValue,
          mistakeInSentence:
            initialText.slice(0, indexOfLastTypedValue) +
            "_" +
            initialText.slice(indexOfLastTypedValue + 1),
        },
      ]);
    }
  };

  const handleKeyPress: any = (e: React.KeyboardEvent) => {
    setTypedText((p) => {
      const lastTypedValue = e.key;
      const currentValue = p + lastTypedValue;
      const indexOfLastTypedValue = currentValue.length - 1;

      // console.log({ prevValue: p });
      // console.log({ currentValue });
      typoCatching(p, currentValue, lastTypedValue, indexOfLastTypedValue);

      return p.length + 1 <= initialText.length ? p + lastTypedValue : p;
    });
  };

  const backspace: any = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      setTypedText((p) => p.slice(0, p.length - 1));
    }
  };

  const wordPerMinute = (mls: number) => {
    const words = initialText.split(" ").length;
    const seconds = mls / 1000;
    return Math.round((words / seconds) * 60);
  };

  const correctnessOfAnswer = () => {
    return 100 - Math.round((mistakes.length / initialText.length) * 100);
  };

  const reset = () => {
    setTypedText("");
    setTime(0);
    setIsRunning(false);
    setMistakes([]);
    setInitialText(getRandomText(difficulty));
  };

  useEffect(() => {
    setInitialText(getRandomText(difficulty));
  }, [difficulty]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("keydown", backspace);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("keydown", backspace);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const indexOfLastTypedValue = typedText.length - 1;
    const lastTypedValue = typedText[indexOfLastTypedValue];

    //---START---
    if (typedText.length === 1) setIsRunning(true);
    //---END---
    if (typedText.length === initialText.length) {
      setIsRunning(false);

      for (let i = 0; i < initialText.length; i++) {
        if (typedText[i] !== initialText[i]) {
          if (
            !mistakes.some(
              (mistake) => mistake.text === typedText[i] && mistake.index === i
            )
          ) {
            setMistakes((p) => [
              ...p,
              {
                text: typedText[i],
                index: i,
                mistakeInSentence:
                  initialText.slice(0, i) + "_" + initialText.slice(i + 1),
              },
            ]);
          }
        }
      }
    }

    //---RESET---
    if (typedText.length === 0) {
      setTime(0);
      setIsRunning(false);
      setMistakes([]);
    }

    // //---EVERY TYPED VALUE---
    // console.log(typedText);

    // if (
    //   // prev value length < current value length
    //   lastTypedValue !== initialText[indexOfLastTypedValue]
    //   //  &&
    //   // !mistakes.some(
    //   //   (mistake) =>
    //   //     mistake.text === text[indexOfLastTypedValue] &&
    //   //     mistake.index === indexOfLastTypedValue
    //   // )
    // ) {
    //   setMistakes((p) => [
    //     ...p,
    //     {
    //       text: initialText[indexOfLastTypedValue],
    //       index: indexOfLastTypedValue,
    //       mistakeInSentence:
    //         initialText.slice(0, indexOfLastTypedValue) +
    //         "_" +
    //         initialText.slice(indexOfLastTypedValue + 1),
    //     },
    //   ]);
    // }
  }, [typedText]);

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => setTime((p) => p + 1000), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const isEnd = time > 0 && !isRunning && typedText !== "";

  const results: TResult = {
    correctnessOfAnswer: correctnessOfAnswer(),
    WPM: wordPerMinute(time),
    seconds: time / 1000,
  };

  // console.log({ text });
  // console.log({ typedText });

  return (
    <div className="bg-neutral-800 w-screen h-screen p-10 relative">
      <FinishModal isOpen={isEnd} results={results} reset={reset} />
      {typedText === "" ? (
        <AnimatePresence>
          <TextSettings
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            reset={reset}
            testText
          />
        </AnimatePresence>
      ) : null}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-2 items-center select-none text-2xl">
        <div className="flex items-center relative flex-wrap w-2/3">
          {typedText.length === 0 ? <Line variants="waiting" /> : null}
          {initialText.split("").map((char, i) => (
            <div
              key={i}
              className={clsx("relative", {
                "w-3 h-8": char === " ",
                "text-neutral-600": typedText[i] === undefined,
                "text-white":
                  typedText[i] !== undefined && char === typedText[i],
                "text-red-600":
                  typedText[i] !== undefined && char !== typedText[i],
              })}
            >
              {typedText.length - 1 === i ? <Line variants="working" /> : null}

              {char}
              {typedText[i] !== undefined && char !== typedText[i] ? (
                <div className="absolute bottom-3/4 left-1/2 -translate-x-1/2 text-sm text-red-800">
                  {typedText[i]}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <ResetButton onClick={reset} />
      </div>
    </div>
  );
}
