import { SET_MODULE, ModuleActionTypes } from '../action/ModuleAction';

export interface State {
  value: {
    data: string;
  };
}

export const myModuleReducer = (state: State, action: ModuleActionTypes): State => {
  switch (action.type) {
    case SET_MODULE:
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
