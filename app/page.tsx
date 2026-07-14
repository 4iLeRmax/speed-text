import React, { Suspense } from "react";
import SpeedText from "./components/SpeedText";

export default function HomePage() {
  return (
    <>
      <>{/* <SpeedTextWrapper /> */}</>
      <Suspense fallback={null}>
        <SpeedText />
      </Suspense>
    </>
  );
}
