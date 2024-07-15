import { SET_JSON, JSONActionTypes, AppData } from '../action/JSONAction';

export interface State {
  value: {
    data: AppData; // Use AppData type here
  };
}

export const myJSONReducer = (state: State, action: JSONActionTypes): State => {
  switch (action.type) {
    case SET_JSON:
      return {
        ...state,
        value: {
          ...state.value,
          data: action.payload.data, // This is expected to be of type AppData
        },
      };
    default:
      return state;
  }
};
