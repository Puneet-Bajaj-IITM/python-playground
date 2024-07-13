import { useState, useEffect, useContext } from "react";
import { useStore } from "../store";
import { toast } from "react-toastify";
import { SelectedFileContext } from "../store/context/SelectedFileContext";

declare global {
  interface Window {
    loadPyodide: () => Promise<any>;
  }
}

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { setOutput, setError } = useStore();
  const selectedfilecontext = useContext(SelectedFileContext);

  if (!selectedfilecontext) {
    throw new Error("Context not found");
  }
  const { state: SelectedFileState, setSelectedFile } = selectedfilecontext;

  const handleRunCode = async (code: string) => {
    if (pyodide) {
      try {
        setError(null);
        const printOutput: string[] = [];
        pyodide.globals.set("print", (...args: any[]) => {
          const result = args.join(" ");
          printOutput.push(result);
          setOutput(printOutput.join("\n"));
        });
        if (SelectedFileState.value.data == "main") {
          const tempCode = `import importlib \nimport mymodule \nimportlib.reload(mymodule)\n${code}`;
          console.log(tempCode)
          await pyodide.runPythonAsync(tempCode);
        } else {
          await pyodide.runPythonAsync(code);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
  };

  const handleSaveCode = async (filename: string, code: string) => {
    if (pyodide) {
      try {
        pyodide.FS.writeFile(filename, code);
        console.log(`File ${filename} saved successfully.`);
        toast.success("File Saved", {
          autoClose: 3000,
        });
      } catch (error) {
        console.error(`Failed to save file: ${filename}`, error);
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      if (!window.loadPyodide) {
        console.error("Pyodide script not loaded.");
        return;
      }

      const pyodideInstance = await window.loadPyodide();
      setPyodide(pyodideInstance);

      await pyodideInstance.loadPackage("micropip");
      const micropip = await pyodideInstance.pyimport("micropip");
      window.micropip = micropip;

      const filesToLoad = ["data.csv", "readme.txt"];
      for (const file of filesToLoad) {
        try {
          const response = await fetch(`/python-playground/${file}`);
          const content = await response.text();
          pyodideInstance.FS.writeFile(file, content);
        } catch (error) {
          console.error(`Failed to load file: ${file}`, error);
        }
      }

      pyodideInstance.FS.writeFile("mymodule.py", "");

      setLoading(false);
    };
    load();
  }, []);

  return { pyodide, loading, handleRunCode, handleSaveCode };
};
