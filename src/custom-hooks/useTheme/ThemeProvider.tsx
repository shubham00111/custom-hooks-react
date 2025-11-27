import React, { createContext, useEffect, useState } from "react";
import type {
  Resolved,
  Theme,
  ThemeContextProps,
  ThemeProviderProps,
} from "./types";

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

const ThemeProvider = ({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const resolvedTheme: Resolved = theme === "system" ? getSystemTheme() : theme;

  const applyTheme = () => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(resolvedTheme);
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      return;
    }

    const initial = theme || defaultTheme;
    setTheme(initial as Theme);
    applyTheme();
  }, []);

  useEffect(() => {
    if (!theme) {
      return;
    }
    localStorage.setItem("theme", theme);
    applyTheme();
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme();
    };
    media.addEventListener("change", handler);
    return () => {
      media.removeEventListener("change", handler);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        systemTheme: getSystemTheme(),
        resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
