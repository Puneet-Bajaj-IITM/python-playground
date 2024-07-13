import { createContext, useReducer, ReactNode } from 'react';
import { SET_DATA, } from '../action/DataAction';
import { myDataReducer, State } from '../reducer/DataReducer';

interface DataContextProviderProps {
  children: ReactNode;
}

interface DataContextType {
  state: State;
  setData: (data: string) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const [state, dispatch] = useReducer(myDataReducer, { value: { data: '' } });

  const setData = (data: string) => {
    dispatch({ type: SET_DATA, payload: { data } });
  };

  return (
    <DataContext.Provider value={{ state, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
