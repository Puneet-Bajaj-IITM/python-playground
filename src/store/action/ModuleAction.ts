export const SET_MODULE = 'SET_DATAMODULE';

export interface SetModuleAction {
  type: typeof SET_MODULE;
  payload: {
    data: string;
  };
}

export type ModuleActionTypes = SetModuleAction;
