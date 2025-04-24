import React, { useEffect, useState } from "react";
import "../lib/String-extensions";

type CountOfWordsProps = {
  initialText: string;
  typedText: string;
};

export default function CountOfWords({
  initialText,
  typedText,
}: CountOfWordsProps) {
  const countTypedWords = (initialText: string, typedText: string) => {
    const initialWords = initialText.split(" ");

    // Calculate total character count (including spaces) for each word in target
    let targetCharacterCount = -1;
    const initialWordsLastIndex = initialWords.map((word, index) => {
      const wordLength =
        word.length + (index < initialWords.length - 1 ? 1 : 0);
      targetCharacterCount += wordLength;
      return targetCharacterCount;
    });
    // console.log(initialWordsLastIndex);

    // Get the number of characters the user has typed
    const indexOfLastTypedChar = typedText.length - 1;

    // Calculate how many words the user has typed based on character count
    let wordsPassed = 0;
    for (let i = 0; i < initialWords.length; i++) {
      if (indexOfLastTypedChar >= initialWordsLastIndex[i]) {
        wordsPassed = i + 1;
      } else {
        break;
      }
    }

    return {
      wordsPassed,
      totalTargetWords: initialWords.length,
      indexOfLastTypedChar,
      isComplete: wordsPassed === initialWords.length,
      progress: ((wordsPassed / initialWords.length) * 100).toFixed(1) + "%",
    };
  };

  return (
    <>
      <div className="flex items-center justify-start gap-1 text-yellow-500 ">
        <div>{countTypedWords(initialText, typedText).wordsPassed}</div>
        <div>/</div>
        <div>{initialText.countOfWords()}</div>
      </div>
    </>
  );
}
