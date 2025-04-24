import dynamic from "next/dynamic";
import React from "react";
import SpeedTextWrapper from "./components/SpeedTextWrapper";

export default function HomePage() {
  function gcd(a: number, b: number) {
    let resA: number[] = [];
    let resB: number[] = [];

    const func1 = (num: number, arr: number[]) => {
      let temp = 2;
      while (num % temp !== 0) {
        temp++;
      }
      arr.push(temp);
      num = num / temp;

      if (num !== 1) func1(num, arr);
    };

    func1(a, resA);
    func1(b, resB);

    return resA
      .filter((el, i) => {
        const matchElIndex = resB.indexOf(el);

        if (matchElIndex !== -1) {
          resB.splice(matchElIndex, 1);
          return true;
        }
        return false;
      })
      .reduce((acc, curr) => acc * curr);
  }

  console.log(gcd(8, 20));

  return (
    <>
      <>{/* <SpeedTextWrapper /> */}</>
    </>
  );
}
