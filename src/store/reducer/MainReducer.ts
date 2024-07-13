import { SET_MAIN, MainActionTypes } from '../action/MainAction';

export interface State {
  value: {
    data: string;
  };
}

export const myMainReducer = (state: State, action: MainActionTypes): State => {
  switch (action.type) {
    case SET_MAIN:
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
