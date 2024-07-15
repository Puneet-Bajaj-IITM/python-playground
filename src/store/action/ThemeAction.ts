export const SET_THEME = 'SET_THEME';

export interface SetThemeAction {
  type: typeof SET_THEME;
  payload: {
    data: ThemeData | undefined;
  };
}

export interface ThemeData {
  background?: string;
  foreground?: string;
  border?: string
  [key: string]: any;
}

export type ThemeActionTypes = SetThemeAction;
