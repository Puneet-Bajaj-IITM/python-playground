import { createContext, useReducer, ReactNode } from 'react';
import { AppData, SET_JSON } from '../action/JSONAction';
import { myJSONReducer, State } from '../reducer/JSONReducer';

interface JSONContextProviderProps {
  children: ReactNode;
}

interface JSONContextType {
  state: State;
  setJSON: (data: AppData) => void; // Make sure this matches the AppData type
}

export const JSONContext = createContext<JSONContextType | undefined>(undefined);

const JSONContextProvider = ({ children }: JSONContextProviderProps) => {
  const [state, dispatch] = useReducer(myJSONReducer, { value: { data: { appname: { editor_theme: '', Playgorund_Title: '', dir_load: '', ext_url: '', report_issue : '', playground_instructions: [], blog_url: '', Task_instructions: [] } } } });

  const setJSON = (data: AppData) => {
    dispatch({ type: SET_JSON, payload: { data } });
  };

  return (
    <JSONContext.Provider value={{ state, setJSON }}>
      {children}
    </JSONContext.Provider>
  );
};

export default JSONContextProvider;
