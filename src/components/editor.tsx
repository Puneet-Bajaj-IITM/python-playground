import { useStore } from "../store";

import MonacoEditor from "@monaco-editor/react";
import { Separator } from "./ui/separator";
import Loader from "./loader";
import { useContext } from "react";
import { ReadmeContext } from "../store/context/ReadmeContext";
import { DataContext } from "../store/context/DataContext";
import { SelectedFileContext } from "../store/context/SelectedFileContext";
import { MainContext } from "../store/context/MainContext";
import { ModuleContext } from "../store/context/ModuleContext";

export default function Editor() {
  const { code, setCode } = useStore();

  const readmecontext = useContext(ReadmeContext);
  const datacontext = useContext(DataContext);
  const selectedfilecontext = useContext(SelectedFileContext);
  const maincontext = useContext(MainContext);
  const modulecontext = useContext(ModuleContext);

  if (!maincontext) {
    throw new Error('ReadmeContext not found');
  }

  if (!modulecontext) {
    throw new Error('ReadmeContext not found');
  }


  if (!readmecontext) {
    throw new Error('ReadmeContext not found');
  }

  if (!datacontext) {
    throw new Error('ReadmeContext not found');
  }

  if (!selectedfilecontext) {
    throw new Error('ReadmeContext not found');
  }


  const { state: ReadmeState, setReadme } = readmecontext;
  const { state: DataState, setData } = datacontext;
  const { state: SelectedFileState, setSelectedFile } = selectedfilecontext;
  const { state: MainState, setMain } = maincontext;
  const { state: ModuleState, setModule } = modulecontext;






  function handleCodeOnChange(e: string | undefined) {
    if (e) {
      if (SelectedFileState.value.data == 'data' || SelectedFileState.value.data == 'readme') {

      } else {
        if (SelectedFileState.value.data == 'main') {
          setMain(e)
        }
        if (SelectedFileState.value.data == 'mymodule') {
          setModule(e)
        }
        setCode(e);
      }

    }
  }

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

  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#1E1E1E] pt-4">
      <MonacoEditor
        defaultLanguage="python"
        defaultValue="Loading"
        theme="vs-dark"
        value={code}
        className="relative"
        onChange={handleCodeOnChange}
        loading={<Loader text="Loading Editor" />}
        onMount={() => handleEditorLoaded()}
      />
      <Separator />
    </div>
  );
}
