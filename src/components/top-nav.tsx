import { useContext } from "react";
import { useStore } from "../store";
import { SelectedFileContext } from "../store/context/SelectedFileContext";
import { Button } from "./ui/button";
import { Download, Play } from "lucide-react";
import Settings from "./settings";

interface TopNavProps {
  handleRunCode: () => Promise<void>;
  handleSaveCode: () => Promise<void>
}

export default function TopNav({ handleRunCode, handleSaveCode }: TopNavProps) {
  const { code } = useStore();
  const selectedfilecontext = useContext(SelectedFileContext);
  if (!selectedfilecontext) {
    throw new Error('ReadmeContext not found');
  }
  const { state: SelectedFileState } = selectedfilecontext;


  // function handleChangeDirection() {
  //   setDirection(direction === "vertical" ? "horizontal" : "vertical");
  // }

  // function handleCodeDelete() {
  //   setCode("");
  //   clearOutput("Running Python 3.12.1");
  // }

  function handleDownloadCode() {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "code.py";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section className="flex gap-2 justify-between p-2 bg-[#FFFFFF]">
      <div className="flex gap-2 justify-between items-center grow">
        <text style={{ color: 'black', fontSize: '22px', fontWeight: '700' }}>Python Playground</text>
        <Settings />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

          {/* <Button variant="outline" onClick={handleDownloadCode}>
            <Download className="h-5 w-5" />
            <span className="ml-2">Download</span>
          </Button> */}
          {SelectedFileState.value.data == 'mymodule' &&
            <Button style={{ backgroundColor: 'green', marginLeft: '10px' }} onClick={handleSaveCode} variant="secondary">
              <Download className="h-5 w-5" />
              <span className="ml-2">Save</span>
            </Button>}

          <Button style={{ backgroundColor: '#E1C547', marginLeft: '10px' }} onClick={handleRunCode} variant="secondary">
            <span style={{ color: 'black' }} className="mr-2">Run the code</span>
            <Play style={{ color: 'black' }} className="h-5 w-5" />
          </Button>
        </div>

        {/* <Button onClick={handleCodeDelete} variant="secondary">
          <Trash className="h-5 w-5" />
          <span className="ml-2 hidden md:inline">Delete</span>
        </Button>
        <Button variant="outline" onClick={handleChangeDirection}>
          <Replace className="h-5 w-5" />
          <span className="ml-2 hidden md:inline">Direction</span>
        </Button> */}
      
      </div>
    </section>
  );
}
