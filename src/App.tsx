import { useStore } from "./store";
import { usePyodide } from "./hooks/pyodide";
// import Editor from "./components/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import TopNav from "./components/top-nav";
import Terminal from "./components/terminal";
import { FaRegFolderOpen } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import { FaArrowTurnDown } from "react-icons/fa6";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ReadmeContext } from "./store/context/ReadmeContext";
import { DataContext } from "./store/context/DataContext";
import { MainContext } from "./store/context/MainContext";
import { ModuleContext } from "./store/context/ModuleContext";
import { SelectedFileContext } from "./store/context/SelectedFileContext";
import { useLocation } from 'react-router-dom';
// import CodeEditor from "./components/codeEditor";
import MirrorEditor from "./components/codeMirror";
import PipInstall from "./components/pipInstall";
import MainData from '../public/data/initialize.json'
import { JSONContext } from "./store/context/JSONContext";
import { Button } from "./components/ui/button";
import { ThemeContext } from "./store/context/ThemeContext";
import ClipLoader from 'react-spinners/ClipLoader';
import { EditorTheme } from "./lib/editor-theme";
import { themes } from "./themeData/themes";
import createTheme from "@uiw/codemirror-themes";
import { darkTheme } from "./components/ui/themes";

interface TaskInstruction {
  [key: string]: string;
}

interface TaskItemProps {
  singleKey: string;
  item: string;
  head: number
}

function App() {

  const { loading, handleRunCode, handleSaveCode } = usePyodide();
  const { code, setCode } = useStore();
  const readmecontext = useContext(ReadmeContext);
  const datacontext = useContext(DataContext);
  const maincontext = useContext(MainContext);
  const modulecontext = useContext(ModuleContext);
  const selectedfilecontext = useContext(SelectedFileContext);
  const jsoncontext = useContext(JSONContext)
  const themecontext = useContext(ThemeContext)
  const [editorTheme, setEditorTheme] = useState<any>(undefined);

  if (!readmecontext || !datacontext || !maincontext || !modulecontext || !selectedfilecontext || !jsoncontext || !themecontext) {
    throw new Error('Context not found');
  }


  const { state: ReadmeState, setReadme } = readmecontext;
  const { state: DataState, setData } = datacontext;
  const { state: MainState, setMain } = maincontext;
  const { state: ModuleState, setModule } = modulecontext;
  const { state: SelectedFileState, setSelectedFile } = selectedfilecontext;
  const { state: JSONState, setJSON } = jsoncontext;
  const { state: ThemeState, setTheme } = themecontext



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/python-playground/data/initialize.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJSON(data);
        try {
          const response = await fetch(`/python-playground/${data.appname.dir_load}/readme.txt`);
          const text = await response.text();
          setReadme(text);

        } catch (error) {
          console.error('Error fetching readme.txt:', error);
        }
        try {
          const response = await fetch(`/python-playground/${data.appname.dir_load}/data.csv`);
          const text = await response.text();
          setData(text)

        } catch (error) {
          console.error('Error fetching readme.txt:', error);
        }
        setCode(MainState.value.data)

        const temp = findObjectByName(themes, data.appname.editor_theme);
        if (temp) {
          const options = temp?.options
            const createdTheme = createTheme({
              ...options,
              settings: {
                ...options.settings,
              },
            });
            setEditorTheme(createdTheme);
          
         
          setTheme({
            background: temp?.options.settings.background,
            foreground: temp?.options.settings.caret ? temp?.options.settings.caret : temp?.options.settings.foreground,
            border: temp?.options.settings.selection
          });
        } else {
          setEditorTheme(darkTheme)
          setTheme({
            background: "#282C34",
            foreground: "#BEBEBE",
            border: '#333333'
          });
        }
      } catch (error) {
        console.error('Error fetching the JSON file:', error);
      }
    };

    fetchData();
  }, []);

  function findObjectByName(mainObject: Record<string, EditorTheme>, targetName: string) {
    for (const key in mainObject) {
      if (mainObject[key].name === targetName) {
        return mainObject[key];
      }
    }
    return undefined;
  }


  function handleFileSelection(item: string) {
    if (item == 'main') {
      setSelectedFile('main')
      setCode(MainState.value.data)
    }
    if (item == 'mymodule') {
      setSelectedFile('mymodule')
      setCode(ModuleState.value.data)
    }
    if (item == 'data') {
      setSelectedFile('data')
      setCode(DataState.value.data)
    }
    if (item == 'readme') {
      setSelectedFile('readme')
      setCode(ReadmeState.value.data)
    }
  }

  const EachTask: React.FC<TaskItemProps> = ({ singleKey, item, head }) => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
      setChecked(!checked);
    };

    return (
      <div className="mt-2 p-2 border border-gray-300 flex flex-col shadow-lg" style={{ flexDirection: 'column', backgroundColor: checked ? '#95ED92' : 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ height: '20px', width: '20px', alignItems: 'center', justifyContent: 'center', display: 'flex', borderRadius: '10px', backgroundColor: '#E1C547' }}>
            <p style={{ fontSize: '12px', color: 'black', fontWeight: 'bold' }}>
              {head}</p>
          </div>
          <p style={{ fontSize: '12px', marginLeft: '5px', fontWeight: 'bold' }} className="text-black">
            {singleKey}
          </p>

        </div>
        <p style={{ fontSize: '12px' }} className="text-black">{item}</p>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <label style={{ color: 'black', fontSize: '12px', alignItems: 'center', display: 'flex' }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
              style={{ marginRight: '5px' }}
            />
            {'Mark as done'}
          </label>
        </div>
      </div>
    )
  }




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

  return (
    <main className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <div className="w-1/5 h-[99vh] bg-white border border-gray-300 flex-shrink-0">
          <div className="h-full p-2 overflow-y-auto">
            <p className="text-black text-xl font-bold mb-4">Tasks to do</p>
            {JSONState.value.data && JSONState.value.data.appname.Task_instructions.map((task, outerIndex) => (
              <div key={outerIndex}>
                {Object.entries(task).map(([key, value], innerIndex) => (
                 <EachTask
                    key={`${key}-${outerIndex}-${innerIndex}`} // Make the key more unique
                    singleKey={key}
                    item={value}
                    head={innerIndex + 1} // Use outerIndex directly as ID
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/5 bg-white flex flex-col" style={{ height: '100vh' }}>
          <TopNav handleRunCode={async () => await handleRunCode(code)} handleSaveCode={async () => await handleSaveCode('mymodule.py', code)} />

          {ThemeState.value.data?.background && editorTheme ?

            <div className="flex flex-1 flex-col"  >
              <div className="flex flex-1" style={{ flexDirection: 'column', padding: '2px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', }}>
                  <div className="border-2 w-30 flex-shrink-0" style={{ color: ThemeState.value.data?.foreground, backgroundColor: ThemeState.value.data?.background, borderColor: ThemeState.value.data?.border }}>
                    <p className=" text-xl font-bold p-5 text-center">Files</p>
                    <ul className="border-t-2 ]" style={{ borderColor: ThemeState.value.data?.border }}>
                      <li className="mt-2 p-5">
                        <div className="flex items-center">
                          <FaRegFolderOpen />
                          <p className=" text-md ml-1" style={{ fontSize: '14px' }}>Files</p>
                          <FaArrowTurnDown className="ml-1 mt-3" />
                        </div>
                        <ul className="ml-10 mt-2 space-y-1">
                          {['main.py', 'mymodule.py', 'data.csv', 'readme.txt'].map((file, index) => (
                            <div key={index} className="flex items-center">
                              <FaRegFile size={14} />
                              <li
                                className={`text-sm cursor-pointer ml-1 ${SelectedFileState.value.data === file.split('.')[0] ? 'text-green-500' : 'text-white'}`}
                                style={{ fontSize: '12px', color: SelectedFileState.value.data === file.split('.')[0] ? '#61E368' : ThemeState.value.data ? ThemeState.value.data?.foreground : '#000000' }}
                                onClick={() => handleFileSelection(file.split('.')[0])}
                              >
                                {file}
                              </li>
                            </div>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="border-2 border-l-0" style={{
                    flex: 1, maxHeight: '60vh',
                    overflowY: 'auto',
                    borderColor: ThemeState.value.data?.border,
                    backgroundColor: ThemeState.value.data?.background,

                  }}>
                    <MirrorEditor onChange={handleCodeOnChange} theme={editorTheme} />
                  </div>
                </div>
                <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop:'2px', marginBottom:'2px' }}>
                  <PipInstall />
                </div>
                <div className="border border-gray-300" style={{ height: '200px', width: '100%', overflowY: 'auto' }}>
                  <Terminal handleRunCode={handleRunCode} loading={loading} />
                </div>
              </div>
            </div>
            :
            <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}> 
            <ClipLoader color="black" size={30} />
            </div>}
        </div>
        <div className="w-1/5 h-[99vh] bg-white border border-gray-300 flex-shrink-0">
          <div className=" p-5 overflow-y-auto" style={{ justifyContent: 'space-between', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div>
              <p className="text-black mb-4" style={{ fontSize: '16px', fontWeight: 'bold', textDecorationLine: 'underline' }}>How to use the Playground</p>

              {JSONState.value.data && JSONState.value.data.appname.playground_instructions.map((task, index) => (
                <div key={index}>
                  {Object.entries(task).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex' }}>
                      <p style={{ fontSize: '12px', color: 'red' }}>{key}: </p>
                      <p style={{ fontSize: '12px' }} className="text-black">{value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Button style={{ backgroundColor: 'red', }} variant="secondary" onClick={() => {
              window.open(JSONState.value.data.appname.report_issue, '_blank',);
            }}>
              <span className="ml-2">Report issue</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );

}

export default App;
