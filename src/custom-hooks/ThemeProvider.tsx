import React, { createContext, useEffect, useState } from "react";

interface ThemeProvider {
  children: React.ReactNode;
  defaultTheme?: "system" | "dark" | "light";
}

const ThemeContext = createContext<any>(undefined);

const ThemeProvider = ({
  children,
  defaultTheme = "system",
}: ThemeProvider) => {
  const [theme, setTheme] = useState<string>(defaultTheme);

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme : dark)").matches
      ? "dark"
      : "light";

  const applyTheme = (t: string) => {
    const root = document.documentElement;

    if (t === "system") {
      root.classList.add(getSystemTheme());
    } else {
      root.classList.add(t);
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const initialTheme = theme || defaultTheme;
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (!theme) {
      return;
    }
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme)");
    const handler = () => {
      if (theme === "system") {
        applyTheme(theme);
      }
    };

    media.addEventListener("change", handler);
    return () => {
      media.removeEventListener("change", handler);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
