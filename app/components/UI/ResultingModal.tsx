"use client";

import React, { useRef, useState } from "react";
import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TMistake, TResult } from "@/types";
import Mistake from "./Mistake";
import { createPortal } from "react-dom";
import Portal from "../Portal";
import Modal from "../Modal";

export default function ResultingModal({
  result,
  reset,
  initialText,
}: {
  result: TResult;
  reset: () => void;
  initialText: string;
}) {
  const [showMore, setShowMore] = useState(false);
  const listRef = useRef(null) as any;

  const modals = document.getElementById("modals");
  if (modals === null) return null;

  const toggleShowMore = () => setShowMore((p) => !p);

  const component = (
    <>
      <div className="w-[400px] h-auto rounded-xl bg-neutral-800 text-neutral-600 flex flex-col gap-2 px-5 py-10 relative">
        <div
          className={clsx("text-center flex flex-col rounded-md relative", {
            "text-green-500 ": result.correctnessOfAnswer >= 90,
            "text-yellow-500":
              result.correctnessOfAnswer >= 70 &&
              result.correctnessOfAnswer < 90,
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
        {result.mistakes.length > 0 ? (
          <div className="flex justify-center">
            <button
              className="flex flex-col items-center text-sm px-5 py-1"
              onClick={toggleShowMore}
            >
              {showMore ? (
                <>
                  <span>Roll up </span> <ArrowUp size={15} />
                </>
              ) : (
                <>
                  <span>Show mistakes </span> <ArrowDown size={15} />
                </>
              )}
            </button>
          </div>
        ) : null}
        {showMore ? (
          <div
            className={clsx("flex flex-col gap-0.5", {
              "overflow-y-scroll h-[102px]": result.mistakes.length > 4,
            })}
            ref={listRef}
          >
            {result.mistakes.map((mistake, i) => (
              <Mistake key={i} mistake={mistake} initialText={initialText} />
            ))}
          </div>
        ) : null}

        <button
          className="bg-yellow-500 w-2/3 mx-auto rounded-md py-1.5 block"
          onClick={() => {
            reset();
            setShowMore(false);
          }}
        >
          Restart
        </button>
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
