import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black/30 flex items-center justify-center z-20 backdrop-blur-sm">
        {children}
      </div>
    </>
  );
}
