export const SET_MODULE = 'SET_MODULE';

export interface SetModuleAction {
  type: typeof SET_MODULE;
  payload: {
    data: string;
  };
}

export type ModuleActionTypes = SetModuleAction;
