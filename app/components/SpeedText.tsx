"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getRandomSentence, TDifficulty } from "../lib/getRandomSentence";
import { wordPerMinute } from "../lib/wordPerMinute";
import { correctnessOfAnswer } from "../lib/correctnessOfAnswer";
import { isValidDifficulty } from "../lib/isValidDifficulty";

import { useSentenceStore } from "../store/sentenceStore";

// import TextSettings from "./TextSettings";
// import CountOfWords from "./CountOfWords";
// import Sentence from "./UI/Sentence";
const TextSettings = dynamic(() => import("./TextSettings"), {
  ssr: false,
  loading: () => <TextSettingsSkeleton />,
});
const CountOfWords = dynamic(() => import("./CountOfWords"), {
  ssr: false,
  loading: () => <CountOfWordsSkeleton />,
});
const Sentence = dynamic(() => import("./UI/Sentence"), {
  ssr: false,
  loading: () => <SentenceSkeleton />,
});
import ResultingModal from "./UI/ResultingModal";

import { TMistake, TResult } from "@/types";
import dynamic from "next/dynamic";
import {
  CountOfWordsSkeleton,
  SentenceSkeleton,
  TextSettingsSkeleton,
} from "./UI/skeletons";
import RestartButton from "./UI/RestartButton";
import { RotateCcw } from "lucide-react";

export default function SpeedText() {
  const searchParams = useSearchParams();

  const [difficulty, setDifficulty] = useState<TDifficulty>(
    isValidDifficulty(searchParams.get("words"))
      ? (searchParams.get("words") as TDifficulty)
      : "15"
  );
  const [initialText, setInitialText] = useState("");
  const [typedText, setTypedText] = useState("");

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mistakes, setMistakes] = useState<TMistake[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [backspaceButtonIsPressed, setBackspaceButtonIsPressed] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const { fetchSentencesByGroupKey, getSentencesByCroupKey } =
    useSentenceStore();
  const MAXIMUM_UPDATE_DEPTH = 20;

  useEffect(() => {
    (async () => {
      await fetchSentencesByGroupKey(difficulty);
      const sentences = getSentencesByCroupKey(difficulty);
      setInitialText(getRandomSentence(sentences));
      // console.log("initial fetch");
    })();
  }, [fetchSentencesByGroupKey]);

  const reset = () => {
    setTypedText("");
    setTime(0);
    setIsRunning(false);
    setMistakes([]);
  };

  const restart = (difficulty: TDifficulty) => {
    const sentences = getSentencesByCroupKey(difficulty);
    setInitialText(getRandomSentence(sentences as string[]));

    reset();
  };

  const changeDifficulty = async (difficulty: string) => {
    setDifficulty(difficulty as TDifficulty);
    router.push(`${pathname}?words=${difficulty}`);

    const groupAlreadyExist =
      getSentencesByCroupKey(difficulty as TDifficulty) !== undefined;

    if (!groupAlreadyExist) {
      await fetchSentencesByGroupKey(difficulty as TDifficulty);
      // console.log("fetch");
    }
    // else {
    //   console.log("already fetched");
    // }
    restart(difficulty as TDifficulty);
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

    return false;
    return (
      initialText.split(" ")[indexOfLastTypedWord] ===
      typedText.split(" ")[indexOfLastTypedWord]
    );
  };

  const maximumUpdateDepth = (typedText: string) => {
    if (typedText.length >= MAXIMUM_UPDATE_DEPTH) {
      const typedTextSlice = typedText.slice(-MAXIMUM_UPDATE_DEPTH);

      const firstCharOfSlice = typedTextSlice[0];

      for (let i = 0; i < MAXIMUM_UPDATE_DEPTH; i++) {
        if (typedTextSlice[i] !== firstCharOfSlice) return false;
      }
      return true;
    }
  };

  const handleKeyPress: any = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") {
      setTypedText((p) => {
        setBackspaceButtonIsPressed(0);
        const lastTypedValue = e.key;
        const currentValue = p + lastTypedValue;
        const indexOfLastTypedValue = currentValue.length - 1;

        if (maximumUpdateDepth(p)) return p;

        typoCatching(p, currentValue, lastTypedValue, indexOfLastTypedValue);

        return p.length + 1 <= initialText.length ? p + lastTypedValue : p;
      });
    }
  };

  const backspace: any = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (!lastWordIsCorrect()) {
        if (typedText !== "") {
          setBackspaceButtonIsPressed((p) => ++p);
          setTypedText((p) => p.slice(0, p.length - 1));
        }
        if (backspaceButtonIsPressed >= 60) {
          setBackspaceButtonIsPressed(0);
          reset();
        }
      }
    }
  };

  const mouseHandler = () => {
    setMenuIsOpen(true);
  };

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
  }, [typedText]);

  // useEffect(() => {
  //   let intervalId: any;
  //   if (isRunning) {
  //     intervalId = setInterval(() => setTime((p) => p + 1000), 1000);
  //   }
  //   return () => clearInterval(intervalId);
  // }, [isRunning]);

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

  return (
    <>
      {isEnd && typedText.countOfWords() === initialText.countOfWords() ? (
        <ResultingModal
          result={result}
          difficulty={difficulty}
          restart={restart}
          initialText={initialText}
        />
      ) : null}
      <div className="bg-neutral-800 w-screen h-screen p-10 relative select-none">
        <AnimatePresence>
          {typedText === "" || isEnd || menuIsOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TextSettings
                difficulty={difficulty}
                handleClick={changeDifficulty}
                testText
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-1 items-center text-2xl px-10"> */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-1 items-center text-2xl px-10">
          <div className="w-2/3 h-[152px]">
            <CountOfWords initialText={initialText} typedText={typedText} />
            <Sentence initialText={initialText} typedText={typedText} />
          </div>
          <RestartButton
            onClick={() => restart(difficulty)}
            secondChildren={"Restart Test"}
            styles="relative mt-5"
          >
            <RotateCcw size={20} color={"#525252"} />
          </RestartButton>
        </div>
      </div>
    </>
  );
}
