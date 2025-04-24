import React, { useEffect } from "react";
import { TDifficulty } from "../lib/getRandomSentence";
import clsx from "clsx";
import { useSentenceStore } from "../store/sentenceStore";
import { usePathname, useRouter } from "next/navigation";

export default function TextSettings({
  difficulty,
  // setDifficulty,
  // reset,
  handleClick,
  testText = false,
}: {
  difficulty: TDifficulty;
  // setDifficulty: React.Dispatch<React.SetStateAction<TDifficulty>>;
  // reset: () => void;
  handleClick: (difficulty: string) => Promise<void>;
  testText?: boolean;
}) {
  const { sentenceGroupsKey, fetchSentenceGroupsKey } = useSentenceStore();

  useEffect(() => {
    fetchSentenceGroupsKey();
  }, [fetchSentenceGroupsKey]);

  const router = useRouter();
  const pathname = usePathname();

  // const handleClick = (difficulty: string) => {
  //   setDifficulty(difficulty as TDifficulty);
  //   reset();
  //   router.push(`${pathname}?words=${difficulty}`);
  // };

  return (
    <>
      <div className="flex items-center gap-2 text-sm bg-neutral-900 text-neutral-600 px-5 py-2 rounded-md">
        <div>Words:</div>
        <div className="flex items-center gap-2">
          {sentenceGroupsKey
            .filter((el) => (!testText ? el != "test" : el))
            .map((el) => (
              <button
                key={el}
                className={clsx("", {
                  "text-yellow-500": difficulty === el,
                })}
                onClick={() => handleClick(el)}
                onKeyDown={(e) => e.currentTarget.blur()}
              >
                {el}
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
