import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { SET_THEME, ThemeActionTypes, ThemeData } from '../action/ThemeAction';
import { myThemeReducer, State } from '../reducer/ThemeReducer';

interface ThemeContextProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  state: State;
  setTheme: (data: ThemeData | undefined) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [state, dispatch] = useReducer(myThemeReducer, { value: { data: {} } });

  const setTheme = (data: ThemeData | undefined) => {
    dispatch({ type: SET_THEME, payload: { data } });
  };

  return (
    <ThemeContext.Provider value={{ state, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
