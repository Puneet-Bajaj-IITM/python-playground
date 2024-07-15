import CodeMirror from "@uiw/react-codemirror";
import { useStore } from "../store";
import { python } from "@codemirror/lang-python";


interface CodeEditorProps {
    onChange: (code: string) => void;
    theme: any;
}

const MirrorEditor: React.FC<CodeEditorProps> = ({ onChange, theme}) => {
    const { code } = useStore();



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
            theme={theme}
            basicSetup={{
                foldGutter: false,
                allowMultipleSelections: false,
                lineNumbers: true,
                highlightActiveLine: false,
            }}
            style={{
                fontSize: '16px',
                height: '100%'
            }}

        />


    );
};

export default MirrorEditor;