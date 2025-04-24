import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Line } from "./Line";
import Letter from "./Letter";

type SentenceProps = {
  initialText: string;
  typedText: string;
};

export const LINE_HEIGHT = 40;
export const MARGIN_TOP = 8;

export default function Sentence({ initialText, typedText }: SentenceProps) {
  const [currentRow, setCurrentRow] = useState(1);
  const [hiddenRows, setHiddenRows] = useState(0);

  const lineRef = useRef<any>(null);
  const blockRef = useRef<any>(null);

  useEffect(() => {
    if (lineRef.current !== null) {
      const cursorTop = Math.floor(lineRef.current.getBoundingClientRect().top);
      const firstLineTop =
        Math.floor(blockRef.current.getBoundingClientRect().top) + MARGIN_TOP;
      const lastLineTop = Math.floor(firstLineTop + LINE_HEIGHT * 2);

      const prevLineTop = Math.floor(
        lastLineTop - LINE_HEIGHT * (currentRow - hiddenRows)
      );
      const nextLineTop = Math.floor(
        firstLineTop + LINE_HEIGHT * (currentRow - hiddenRows)
      );

      // Switching to the next row
      if (cursorTop === nextLineTop) {
        setCurrentRow((p) => ++p);
        //additional "if" when we move on the 3-rd row
        if (cursorTop === lastLineTop) setHiddenRows((p) => ++p);
      }

      // Switching to the prev row
      if (currentRow > 1 && cursorTop === prevLineTop) {
        // console.log("--rows");
        setCurrentRow((p) => --p);
        //additional "if" when we move from 3-rd row to the 2-nd row
        if (cursorTop === firstLineTop)
          //when currentRow is 2 we don't have hidden rows
          setHiddenRows((p) => (p !== 0 ? --p : p));
      }

      // console.log({
      //   // firstLineTop,
      //   // lastLineTop,
      //   cursorTop,
      //   nextLineTop,
      //   prevLineTop,
      //   // hiddenRows,
      //   // currentRow,
      // });
    }
  }, [typedText]);

  const reset = () => {
    setCurrentRow(1);
    setHiddenRows(0);
  };

  useEffect(() => {
    reset();
  }, [initialText]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          ref={blockRef}
          key={initialText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="flex justify-center w-full overflow-hidden pl-[1px]"
          style={{ maxHeight: `${LINE_HEIGHT * 3}px` }}
        >
          <div
            className="flex items-center relative flex-wrap"
            style={{
              marginTop: `-${
                currentRow >= 3 ? (currentRow - 2) * LINE_HEIGHT : 0
              }px`,
            }}
          >
            {typedText.length === 0 ? <Line variants="waiting" /> : null}
            {initialText.split("").map((char, i) => (
              <Letter
                key={i}
                char={char}
                typedLetter={typedText[i]}
                isCurrentLetter={typedText.length - 1 === i}
                lineRef={lineRef}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
