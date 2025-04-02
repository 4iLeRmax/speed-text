import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";

type LineProps = {
  variants: "waiting" | "working";
  lineRef?: React.RefObject<null>;
};

export const Line = ({ variants, lineRef }: LineProps) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          ref={lineRef}
          className={clsx(
            // "absolute top-[12.5%] w-[1px] h-[24px] bg-yellow-500",
            "absolute w-[1px] h-[32px] bg-yellow-500",
            {
              "right-full animate-pulse top-2": variants === "waiting",
              "left-full top-0": variants === "working",
            }
          )}
          layoutId="line"
          transition={{ duration: 0.2 }}
        ></motion.div>
      </AnimatePresence>
    </>
  );
};
