import React, { useEffect, useRef, useState } from "react";
import { Line } from "./Line";
import Letter from "./Letter";

type SentenceProps = {
  initialText: string;
  typedText: string;
};

const LINE_HEIGHT = 32;

export default function Sentence({ initialText, typedText }: SentenceProps) {
  const [top, setTop] = useState(0);
  const [currentRow, setCurrentRow] = useState(1);

  // var topPos = element.getBoundingClientRect().top + window.scrollY;

  useEffect(() => {
    const line = document.getElementById("line");
    if (line !== null) {
      const top = line.getBoundingClientRect().top;
      setTop((p) => {
        if (p + LINE_HEIGHT === top) {
          console.log("next line");
          setCurrentRow((p) => ++p);
        }
        if (p - LINE_HEIGHT === top) {
          console.log("prev line");
          setCurrentRow((p) => --p);
        }
        return top;
      });
    }
  });

  return (
    <>
      <div
        className="flex justify-center overflow-hidden w-full"
        style={{ maxHeight: `${LINE_HEIGHT * 3}px` }}
      >
        <div
          className="flex items-center relative flex-wrap w-2/3"
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
            />
          ))}
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
