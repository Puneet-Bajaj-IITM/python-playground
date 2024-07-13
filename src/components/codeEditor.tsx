import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-cloud_editor_dark'
import { useStore } from '../store';
import { useContext } from "react";
import { ReadmeContext } from "../store/context/ReadmeContext";
import { DataContext } from "../store/context/DataContext";
import { MainContext } from "../store/context/MainContext";

interface CodeEditorProps {
  initialCode: string;
  onChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange }) => {

    const { code, setCode } = useStore();

  const readmecontext = useContext(ReadmeContext);
  const datacontext = useContext(DataContext);
  const maincontext = useContext(MainContext);

  if (!maincontext) {
    throw new Error('ReadmeContext not found');
  }

  if (!readmecontext) {
    throw new Error('ReadmeContext not found');
  }

  if (!datacontext) {
    throw new Error('ReadmeContext not found');
  }

  const {  setReadme } = readmecontext;
  const {  setData } = datacontext;
  const { state: MainState } = maincontext;

    async function handleEditorLoaded() {
        setCode(MainState.value.data)
        try {
          const response = await fetch('/python-playground/readme.txt');
          const text = await response.text();
          setReadme(text);
    
        } catch (error) {
          console.error('Error fetching readme.txt:', error);
        }
        try {
          const response = await fetch('/python-playground/data.csv');
          const text = await response.text();
          setData(text)
    
        } catch (error) {
          console.error('Error fetching readme.txt:', error);
        }
      }


    function handleCodeOnChange(e: string | undefined) {
        if(e){
            onChange(e);
        }
      }



  return (
    <div className="flex h-full flex-col items-center justify-center pt-2 bg-[#282C34]">
    <AceEditor
    style={{paddingTop:'10px'}}
      mode="python"
      theme="cloud_editor_dark" // Change to the desired theme
      value={code}
      onChange={handleCodeOnChange}
      name="code_editor"
      editorProps={{ $blockScrolling: true }}
      width="100%"
      height="100%" // Adjust height as needed
      setOptions={{
        showGutter: true,
        fontFamily : 'Roboto Mono'
      }}
      onLoad={handleEditorLoaded}
      showPrintMargin={false}
        className="roboto-mono-regular"
    />
    </div>
  );
};

export default CodeEditor;
