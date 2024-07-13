export const SET_SELECTEDFILE = 'SET_SELECTEDFILE';

export interface SetSelectedFileAction {
  type: typeof SET_SELECTEDFILE;
  payload: {
    data: string;
  };
}

export type SelectedFileActionTypes = SetSelectedFileAction;
