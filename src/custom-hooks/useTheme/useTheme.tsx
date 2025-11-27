import React, { useContext } from "react";
import type { ThemeContextProps } from "./types";
import { ThemeContext } from "./ThemeProvider";

const useTheme = (): ThemeContextProps => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return ctx;
};
