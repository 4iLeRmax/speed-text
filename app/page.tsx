import dynamic from "next/dynamic";
import React from "react";
import SpeedTextWrapper from "./components/SpeedTextWrapper";
import { sentences } from "./lib/randomText";
import prisma from "./lib/prisma";
import { getSentence } from "./lib/getSentence";
// import TempSpeedText from "./components/tempSpeedText";

export default async function HomePage() {
  const sentence100 = await getSentence("100");

  // console.log(sentence100);

  return (
    <>
      {/* <SpeedText text="drive courage pupil ball worried carried law ear creature wing pressure" /> */}
      {/* <TempSpeedText /> */}
      <SpeedTextWrapper />
      {/* <TempSpeedText text={"movie layers task strange"} /> */}
    </>
  );
}
//1 line of text - 32px
