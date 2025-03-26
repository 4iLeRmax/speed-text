import React from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const modals = document.getElementById("modals");

  if (!modals) return null;

  return <>{createPortal(children, modals)}</>;
}
