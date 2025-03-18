import dynamic from "next/dynamic";
import React from "react";
import SpeedTextWrapper from "./components/SpeedTextWrapper";
// import TempSpeedText from "./components/tempSpeedText";

export default function HomePage() {
  return (
    <>
      {/* <SpeedText text="drive courage pupil ball worried carried law ear creature wing pressure" /> */}
      {/* <TempSpeedText /> */}
      <SpeedTextWrapper />
      {/* <TempSpeedText text={"movie layers task strange"} /> */}
    </>
  );
}
