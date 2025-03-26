import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";

export const Line = ({ variants }: { variants: "waiting" | "working" }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          id="line"
          className={clsx(
            // "absolute top-[12.5%] w-[1px] h-[24px] bg-yellow-500",
            "absolute top-0 w-[1px] h-[32px] bg-yellow-500",
            {
              "right-full animate-pulse": variants === "waiting",
              "left-full": variants === "working",
            }
          )}
          layoutId="line"
          transition={{ duration: 0.2 }}
        ></motion.div>
      </AnimatePresence>
    </>
  );
};
