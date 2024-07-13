import { SET_README, ReadmeActionTypes } from '../action/ReadmeAction';

export interface State {
  value: {
    data: string;
  };
}

export const myReadmeReducer = (state: State, action: ReadmeActionTypes): State => {
  switch (action.type) {
    case SET_README:
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
