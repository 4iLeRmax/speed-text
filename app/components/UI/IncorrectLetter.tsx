import React from "react";

type IncorrectLetterProps = {
  expectedLetter: string;
  currentLetter: string | undefined;
};

export default function IncorrectLetter({
  expectedLetter,
  currentLetter,
}: IncorrectLetterProps) {
  return (
    <>
      {currentLetter !== undefined && expectedLetter !== currentLetter ? (
        <div className="absolute bottom-3/4 left-1/2 -translate-x-1/2 text-sm z-20 text-red-800">
          {currentLetter}
        </div>
      ) : null}
    </>
  );
}
