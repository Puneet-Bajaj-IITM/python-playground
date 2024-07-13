import { createContext, useReducer, ReactNode } from 'react';
import { SET_README, } from '../action/ReadmeAction';
import { myReadmeReducer, State } from '../reducer/ReadmeReducer';

interface ReadmeContextProviderProps {
  children: ReactNode;
}

interface ReadmeContextType {
  state: State;
  setReadme: (data: string) => void;
}

export const ReadmeContext = createContext<ReadmeContextType | undefined>(undefined);

const ReadmeContextProvider = ({ children }: ReadmeContextProviderProps) => {
  const [state, dispatch] = useReducer(myReadmeReducer, { value: { data: '' } });

  const setReadme = (data: string) => {
    dispatch({ type: SET_README, payload: { data } });
  };

  return (
    <ReadmeContext.Provider value={{ state, setReadme }}>
      {children}
    </ReadmeContext.Provider>
  );
};

export default ReadmeContextProvider;
