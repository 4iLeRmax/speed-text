"use client";

import dynamic from "next/dynamic";
import React from "react";
const SpeedText = dynamic(() => import("./SpeedText"), {
  ssr: false,
});

export default function SpeedTextWrapper() {
  return (
    <div>
      <SpeedText />
    </div>
  );
}
