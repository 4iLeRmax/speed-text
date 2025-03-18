"use client";

import React, { useState } from "react";
import { RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export const ResetButton = ({
  size = 20,
  color = "#525252",
  onClick,
}: {
  size?: number;
  color?: string;
  onClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative mt-5">
      {isOpen ? (
        <AnimatePresence>
          <motion.div
            className={clsx(
              "absolute top-[120%] left-1/2 -translate-x-1/2",
              "bg-neutral-900 text-sm text-neutral-600 w-32 text-center rounded-md py-1",
              "before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2",
              "before:border-solid before:border-b-neutral-900 before:border-b-8 before:border-x-transparent before:border-x-8 before:border-t-0"
            )}
          >
            Restart Test
          </motion.div>
        </AnimatePresence>
      ) : null}
      <button
        onClick={onClick}
        onKeyDown={(e) => e.currentTarget.blur()}
        className="p-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <RotateCcw size={size} color={color} />
      </button>
    </div>
  );
};
