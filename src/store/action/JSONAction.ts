export const SET_JSON = 'SET_JSON';

export interface AppData {
  appname: {
    editor_theme: string;
    Playgorund_Title: string;
    dir_load: string;
    ext_url: string;
    playground_instructions: Record<string, string>[];
    blog_url: string;
    Task_instructions: Record<string, string>[];
  };
}

export interface SetJSONAction {
  type: typeof SET_JSON;
  payload: {
    data: AppData;
  };
}

export type JSONActionTypes = SetJSONAction;
