"use client";

import React from "react";
import SpeedText from "./SpeedText";
// const SpeedText = dynamic(() => import("./SpeedText"), {
//   ssr: false,
//   loading: () => <SpeedTextSkeleton />,
// });

export default function SpeedTextWrapper() {
  return (
    <>
      <SpeedText />
    </>
  );
}
