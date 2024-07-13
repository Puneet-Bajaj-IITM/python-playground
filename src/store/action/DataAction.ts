export const SET_DATA = 'SET_DATA';

export interface SetDataAction {
  type: typeof SET_DATA;
  payload: {
    data: string;
  };
}

export type DataActionTypes = SetDataAction;
