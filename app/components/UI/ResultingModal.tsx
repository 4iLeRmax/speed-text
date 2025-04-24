"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TResult } from "@/types";
import Mistake from "./Mistake";
import { createPortal } from "react-dom";
import Portal from "../Portal";
import Modal from "../Modal";
import ShowMoreButton from "./ShowMoreButton";
import MistakesList from "../MistakesList";
import ResultingStatistics from "./result/ResultingStatistics";
import RestartButton from "./RestartButton";
import { TDifficulty } from "@/app/lib/getRandomSentence";

export default function ResultingModal({
  result,
  difficulty,
  restart,
  initialText,
}: {
  result: TResult;
  difficulty: TDifficulty;
  restart: (difficulty: TDifficulty) => void;
  initialText: string;
}) {
  const [showMore, setShowMore] = useState(false);

  const modals = document.getElementById("modals");
  if (modals === null) return null;

  const toggleShowMore = () => setShowMore((p) => !p);

  useEffect(() => {
    setShowMore(false);
  }, []);

  const component = (
    <>
      <div className="w-[400px] h-auto rounded-xl bg-neutral-800 text-neutral-600 flex flex-col gap-2 px-5 py-10 relative">
        <ResultingStatistics result={result} />
        {result.mistakes.length > 0 ? (
          <div className="flex justify-center">
            <ShowMoreButton
              showMore={showMore}
              toggleShowMore={toggleShowMore}
              variants={{ primary: "Show mistakes", secondary: "Roll up" }}
            />
          </div>
        ) : null}
        {showMore ? (
          <MistakesList initialText={initialText} mistakes={result.mistakes} />
        ) : null}

        <RestartButton
          onClick={() => restart(difficulty)}
          styles="bg-yellow-500 w-2/3 mx-auto rounded-md py-1.5 block"
        >
          Restart
        </RestartButton>
      </div>
    </>
  );

  return (
    <>
      {createPortal(
        <Portal>
          <Modal>{component}</Modal>
        </Portal>,
        modals
      )}
    </>
  );
}
