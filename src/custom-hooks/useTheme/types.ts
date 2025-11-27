export type Theme = "system" | "light" | "dark";
export type Resolved = "light" | "dark";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}
export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: "light" | "dark";
  resolvedTheme: "light" | "dark";
}
