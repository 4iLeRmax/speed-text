import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import React, { useState } from "react";

type RestartButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  secondChildren?: React.ReactNode;
  styles?: string;
};
export default function RestartButton({
  children,
  onClick,
  secondChildren,
  styles,
}: RestartButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {secondChildren && isOpen ? (
        <AnimatePresence>
          <motion.div
            className={clsx(
              "absolute top-[120%] left-1/2 -translate-x-1/2",
              "bg-neutral-900 text-sm text-neutral-600 w-32 text-center rounded-md py-1",
              "before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2",
              "before:border-solid before:border-b-neutral-900 before:border-b-8 before:border-x-transparent before:border-x-8 before:border-t-0"
            )}
          >
            {secondChildren}
          </motion.div>
        </AnimatePresence>
      ) : null}
      <button
        onClick={onClick}
        onKeyDown={(e) => e.currentTarget.blur()}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={styles !== "" ? styles : ""}
      >
        {children}
      </button>
    </>
  );
}
