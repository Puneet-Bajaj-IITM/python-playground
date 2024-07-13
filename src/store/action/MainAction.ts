export const SET_MAIN = 'SET_MAIN';

export interface SetMainAction {
  type: typeof SET_MAIN;
  payload: {
    data: string;
  };
}

export type MainActionTypes = SetMainAction;
