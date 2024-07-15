import { SET_THEME, ThemeActionTypes, ThemeData } from '../action/ThemeAction';

export interface State {
  value: {
    data: ThemeData | undefined;
  };
}

export const myThemeReducer = (state: State, action: ThemeActionTypes): State => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        value: {
          ...state.value,
          data: action.payload.data,
        },
      };
    default:
      return state;
  }
};
