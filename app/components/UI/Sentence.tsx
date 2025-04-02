import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Line } from "./Line";
import Letter from "./Letter";

type SentenceProps = {
  initialText: string;
  typedText: string;
};

// export const LINE_HEIGHT = 32;
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
        //additional if when we move on the 3-rd row
        if (cursorTop === lastLineTop) setHiddenRows((p) => ++p);
      }

      // Switching to the prev row
      if (currentRow > 1 && cursorTop === prevLineTop) {
        // console.log("--rows");
        setCurrentRow((p) => --p);
        //additional if when we move from 3-rd row to the 2-nd row
        if (cursorTop === firstLineTop + LINE_HEIGHT) setHiddenRows((p) => --p);
      }

      // if (nextLineTop === cursorTop)
      //   console.log("update rows");

      //   setCurrentRow((p) => {
      //     if (p + 1 >= 3) {
      //       setHiddenRows((p) => ++p);
      //     }
      //     return ++p;
      //   });
      // }

      // if(firstLineTop === cursorTop){

      // }
      // console.log("=====================");
      // console.log({ firstLineTop });
      // console.log({ lastLineTop });
      // console.log({ cursorTop });
      // console.log({ nextLineTop });
      // console.log({ prevLineTop });
      // console.log({ hiddenRows });
      // console.log({ currentRow });
    }
  }, [typedText]);

  // if (lineRef.current) {
  //   console.log(lineRef.current.getBoundingClientRect().top);
  // }

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
          transition={{ duration: 0.5 }}
          className="flex justify-center w-full overflow-hidden"
          style={{ maxHeight: `${LINE_HEIGHT * 3}px` }}
        >
          <div
            className="flex items-center relative flex-wrap w-2/3"
            // className="flex items-center relative flex-wrap w-1/6"
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
