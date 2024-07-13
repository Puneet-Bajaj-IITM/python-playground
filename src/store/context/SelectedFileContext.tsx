import { createContext, useReducer, ReactNode } from 'react';
import { SET_SELECTEDFILE, } from '../action/SelectedFileAction';
import { mySelectedFileReducer, State } from '../reducer/SelectedFileReducer';

interface SelectedFileContextProviderProps {
  children: ReactNode;
}

interface SelectedFileContextType {
  state: State;
  setSelectedFile: (data: string) => void;
}

export const SelectedFileContext = createContext<SelectedFileContextType | undefined>(undefined);

const SelectedFileContextProvider = ({ children }: SelectedFileContextProviderProps) => {
  const [state, dispatch] = useReducer(mySelectedFileReducer, { value: { data: 'main' } });

  const setSelectedFile = (data: string) => {
    dispatch({ type: SET_SELECTEDFILE, payload: { data } });
  };

  return (
    <SelectedFileContext.Provider value={{ state, setSelectedFile }}>
      {children}
    </SelectedFileContext.Provider>
  );
};

export default SelectedFileContextProvider;
