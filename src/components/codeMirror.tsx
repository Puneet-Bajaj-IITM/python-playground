import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { useStore } from "../store";
import { python } from "@codemirror/lang-python";
import { useContext, useEffect } from "react";
import { ReadmeContext } from "../store/context/ReadmeContext";
import { DataContext } from "../store/context/DataContext";
import { MainContext } from "../store/context/MainContext";
import { darkTheme } from "./ui/themes";

interface CodeEditorProps {
    onChange: (code: string) => void;
}

const MirrorEditor: React.FC<CodeEditorProps> = ({ onChange }) => {
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

    const { setReadme } = readmecontext;
    const { setData } = datacontext;
    const { state: MainState } = maincontext;

    useEffect(() => {
        handleEditorLoaded()
    }, [])

    async function handleEditorLoaded() {

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
        setCode(MainState.value.data)
    }


    function handleCodeOnChange(e: string | undefined) {
        if (e) {
            onChange(e);
        }
    }




    return (
     
            <CodeMirror
            
                value={code}
                onChange={handleCodeOnChange}
                extensions={[python()]}
                theme={darkTheme}
                basicSetup={{
                    foldGutter: false,
                    allowMultipleSelections: false,
                    lineNumbers: true,
                    highlightActiveLine: false,
                }}
                title="main"
                style={{
                    outline: "none",
                    fontSize: '16px',
                    backgroundColor: '#282C34',
                    height:'100%'
                }}

            />
           
     
    );
};

export default MirrorEditor;