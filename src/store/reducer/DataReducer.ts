import { SET_DATA, DataActionTypes } from '../action/DataAction';

export interface State {
  value: {
    data: string;
  };
}

export const myDataReducer = (state: State, action: DataActionTypes): State => {
  switch (action.type) {
    case SET_DATA:
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
