"use client";

import dynamic from "next/dynamic";
import React from "react";
import { SpeedTextSkeleton } from "./UI/skeletons";
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
