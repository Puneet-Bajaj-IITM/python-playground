import { useStore } from "./store";
import { usePyodide } from "./hooks/pyodide";
import Editor from "./components/editor";
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
import { useContext } from "react";
import { ReadmeContext } from "./store/context/ReadmeContext";
import { DataContext } from "./store/context/DataContext";
import { MainContext } from "./store/context/MainContext";
import { ModuleContext } from "./store/context/ModuleContext";
import { SelectedFileContext } from "./store/context/SelectedFileContext";
import { useLocation } from 'react-router-dom';
import CodeEditor from "./components/codeEditor";

function App() {
  const { loading, handleRunCode, handleSaveCode } = usePyodide();
  const { code, setCode } = useStore();
  const readmecontext = useContext(ReadmeContext);
  const datacontext = useContext(DataContext);
  const maincontext = useContext(MainContext);
  const modulecontext = useContext(ModuleContext);
  const selectedfilecontext = useContext(SelectedFileContext);

  if (!readmecontext) {
    throw new Error('Context not found');
  }

  if (!datacontext) {
    throw new Error('Context not found');
  }

  if (!maincontext) {
    throw new Error('Context not found');
  }

  if (!modulecontext) {
    throw new Error('Context not found');
  }


  if (!selectedfilecontext) {
    throw new Error('Context not found');
  }

  const { state: ReadmeState, setReadme } = readmecontext;
  const { state: DataState, setData } = datacontext;
  const { state: MainState, setMain } = maincontext;
  const { state: ModuleState, setModule } = modulecontext;
  const { state: SelectedFileState, setSelectedFile } = selectedfilecontext;

  function handleFileSelection(item: string) {
    if (item == 'main') {
      console.log(item)
      console.log(SelectedFileState.value.data)
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


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

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
        <div className="w-4/5 bg-white flex flex-col">
          <TopNav handleRunCode={async () => await handleRunCode(code)} handleSaveCode={async () => await handleSaveCode('mymodule.py', code)} />
          <div className="flex flex-1">
            <div className="bg-[#282C34] border-2 border-[#333333] border-t-0 border-l-0 rounded-tl-md w-52 flex-shrink-0">
              <p className="text-white text-xl font-bold p-5 text-center">Files</p>
              <ul className="border-t-2 border-[#333333]">
                <li className="mt-2 p-5">
                  <div className="flex items-center">
                    <FaRegFolderOpen />
                    <p className="text-white text-md ml-1">Files</p>
                    <FaArrowTurnDown className="ml-1 mt-3" />
                  </div>
                  <ul className="ml-10 mt-2 space-y-1">
                    {['main.py', 'mymodule.py', 'data.csv', 'readme.txt'].map((file, index) => (
                      <div key={index} className="flex items-center">
                        <FaRegFile size={14} />
                        <li
                          className={`text-sm cursor-pointer ml-1 ${SelectedFileState.value.data === file.split('.')[0] ? 'text-green-500' : 'text-white'}`}
                          style={{ fontSize: '14px' }} // Optional, since text-sm should handle size
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
            <div className="flex flex-1 overflow-hidden border-2 border-[#333333] border-t-0 border-r-0 rounded-tr-md">
              <ResizablePanelGroup direction="vertical" className="w-full h-full">
                <ResizablePanel defaultSize={65} className="overflow-hidden">
                  {/* <Editor /> */}
                  <CodeEditor initialCode={code} onChange={handleCodeOnChange} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={35} className="overflow-hidden">
                  <Terminal handleRunCode={handleRunCode} loading={loading} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </div>
        <div className="w-1/5 bg-white border border-gray-300 flex-shrink-0">
          <div className="h-full p-5 overflow-y-auto">
            <p className="text-black text-xl font-bold mb-4">Tasks to do</p>
            <div className="mt-2 p-2 border border-gray-300 flex flex-col shadow-lg">
              {Array.from(queryParams.entries()).map(([key, value], index) => (
                <p style={{fontSize:'12px'}} key={key} className="text-black">{index + 1} {value}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
