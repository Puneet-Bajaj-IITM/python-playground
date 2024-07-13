import { SET_SELECTEDFILE, SelectedFileActionTypes } from '../action/SelectedFileAction';

export interface State {
  value: {
    data: string;
  };
}

export const mySelectedFileReducer = (state: State, action: SelectedFileActionTypes): State => {
  switch (action.type) {
    case SET_SELECTEDFILE:
      return {
        ...state,
        value: {
          ...state.value,
          data: action.payload.data,
        },
      };
      break
    default:
      return state;
  }
};
