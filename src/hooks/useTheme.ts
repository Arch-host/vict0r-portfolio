import { useCallback, useState } from "react";
import { applyTheme, readTheme, type ThemeId } from "../lib/theme.ts";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(readTheme);

  const setTheme = useCallback((id: ThemeId) => {
    applyTheme(id);
    setThemeState(id);
  }, []);

  return [theme, setTheme] as const;
}
