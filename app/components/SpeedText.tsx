"use client";

import React, { useEffect, useState } from "react";

import { getRandomText, TDifficulty } from "../lib/randomText";
import { wordPerMinute } from "../lib/wordPerMinute";
import { correctnessOfAnswer } from "../lib/correctnessOfAnswer";

import TextSettings from "./TextSettings";

import { ResetButton } from "./UI/ResetButton";
import ResultingModal from "./UI/ResultingModal";
import Sentence from "./UI/Sentence";
import { TMistake, TResult } from "@/types";
import { motion, AnimatePresence } from "motion/react";

export default function TempSpeedText() {
  const [difficulty, setDifficulty] = useState<TDifficulty>("15");
  const [initialText, setInitialText] = useState("");
  const [typedText, setTypedText] = useState("");

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mistakes, setMistakes] = useState<TMistake[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  //TODO 1: get sentence categories once and set all of them in state management(zustand)
  //TODO 1.1: create store with four arrays for each difficulty 15,30,50,100
  //TODO: auth for saving statistics and creating leaderboard with best results

  // Array.from(document.querySelectorAll('.word')).map(node=> node.textContent).join(' ')

  const fetchSentence = async () => {
    const sentence = await getRandomText(difficulty);
    setInitialText(sentence);
  };

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

  const lastWordIsCorrect = () => {
    const indexOfLastTypedWord = typedText.split(" ").length - 1;

    return (
      initialText.split(" ")[indexOfLastTypedWord] ===
      typedText.split(" ")[indexOfLastTypedWord]
    );
  };

  const handleKeyPress: any = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      setTypedText((p) => {
        const lastTypedValue = e.key;
        const currentValue = p + lastTypedValue;
        const indexOfLastTypedValue = currentValue.length - 1;

        // console.log({ prevValue: p });
        // console.log({ currentValue });
        typoCatching(p, currentValue, lastTypedValue, indexOfLastTypedValue);

        return p.length + 1 <= initialText.length ? p + lastTypedValue : p;
      });
    }
  };

  const backspace: any = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (!lastWordIsCorrect()) {
        setTypedText((p) => p.slice(0, p.length - 1));
      }
    }
  };

  const reset = () => {
    setTypedText("");
    setTime(0);
    setIsRunning(false);
    setMistakes([]);
    fetchSentence();
    // setInitialText(getRandomText(difficulty));
  };

  const mouseHandler = () => {
    setMenuIsOpen(true);
    console.log();
  };

  useEffect(() => {
    fetchSentence();
    // setInitialText(getRandomText(difficulty));
  }, [difficulty]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("keydown", backspace);
    window.addEventListener("mousemove", mouseHandler);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("keydown", backspace);
      window.removeEventListener("mousemove", mouseHandler);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    setMenuIsOpen(false);
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

  const isEnd =
    time > 0 &&
    !isRunning &&
    typedText !== "" &&
    correctnessOfAnswer(initialText.length, mistakes.length) > 1;

  const result: TResult = {
    WPM: wordPerMinute(initialText, time),
    correctnessOfAnswer: correctnessOfAnswer(
      initialText.length,
      mistakes.length
    ),
    seconds: time / 1000,
    mistakes,
  };

  // console.log({ initialText });
  // console.log({ typedText });
  // console.log({ time });

  // console.log(initialText);

  // const indexOfLastTypedValue = typedText.length - 1;
  // console.log(initialText);
  // console.log(indexOfLastTypedValue);

  // for (let i = 0; i < typedText.length; i++) {
  //   const char = typedText[i];

  //   console.log(char);
  //   console.log(i);
  //   console.log(initialText[i]);
  //   let a = i;
  //   while (char !== " ") {
  //     --a;
  //   }
  //   console.log(initialText[i - 1]);
  //   console.log(initialText[i - 2]);
  //   console.log(initialText[i - 3]);
  //   console.log(initialText[i - 4]);
  // }

  return (
    <div className="bg-neutral-800 w-screen h-screen p-10 relative">
      {isEnd ? (
        <ResultingModal
          result={result}
          reset={reset}
          initialText={initialText}
        />
      ) : null}
      <AnimatePresence>
        {typedText === "" || isEnd || menuIsOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TextSettings
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              reset={reset}
              testText
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-2 items-center select-none text-2xl">
        <Sentence initialText={initialText} typedText={typedText} />
        <ResetButton onClick={reset} />
      </div>
    </div>
  );
}
