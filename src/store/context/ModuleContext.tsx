import { createContext, useReducer, ReactNode } from 'react';
import { SET_MODULE, } from '../action/ModuleAction';
import { myModuleReducer, State } from '../reducer/ModuleReducer';

interface ModuleContextProviderProps {
  children: ReactNode;
}

interface ModuleContextType {
  state: State;
  setModule: (data: string) => void;
}

export const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

const ModuleContextProvider = ({ children }: ModuleContextProviderProps) => {
  const [state, dispatch] = useReducer(myModuleReducer, { value: { data: '' } });

  const setModule = (data: string) => {
    dispatch({ type: SET_MODULE, payload: { data } });
  };

  return (
    <ModuleContext.Provider value={{ state, setModule }}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleContextProvider;
