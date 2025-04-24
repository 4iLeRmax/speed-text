import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

type ShowMoreButtonProps = {
  showMore: boolean;
  toggleShowMore: () => void;
  variants: {
    primary: string;
    secondary: string;
  };
};

export default function ShowMoreButton({
  showMore,
  toggleShowMore,
  variants,
}: ShowMoreButtonProps) {
  const { primary, secondary } = variants;
  return (
    <>
      <button
        className="flex flex-col items-center text-sm px-5 py-1"
        onClick={toggleShowMore}
      >
        {showMore ? (
          <>
            <span>{secondary}</span> <ArrowUp size={15} />
          </>
        ) : (
          <>
            <span>{primary}</span> <ArrowDown size={15} />
          </>
        )}
      </button>
    </>
  );
}
