export const SET_README = 'SET_README';

export interface SetReadmeAction {
  type: typeof SET_README;
  payload: {
    data: string;
  };
}

export type ReadmeActionTypes = SetReadmeAction;
