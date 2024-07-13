import { useEffect, useState, useRef } from "react";
import { useStore } from "../store";

import Loader from "./loader";

interface TerminalProps {
  handleRunCode: (code: string) => Promise<void>;
  loading: boolean;
}

export default function Terminal({ handleRunCode, loading }: TerminalProps) {
  const { output, error, setOutput } = useStore();
  const [terminalCode, setTerminalCode] = useState("");
  const outputRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [output]);

  async function terminalCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e) {
      const fromTerminalCode: string = e.currentTarget.terminalCode.value;
      setOutput(fromTerminalCode);
      await handleRunCode(fromTerminalCode);
      setTerminalCode("");
    }
  }

  return (
    <pre
      ref={outputRef}
      className="bg-[#FFFFFF] h-full w-full text-black overflow-x-auto p-4"
    >
      {loading ? (
        <Loader text="Downloading Python" />
      ) : (
        <div style={{display:'flex', flexDirection:'column',}}>
        <text style={{fontSize:'24px', fontWeight:'bold'}}>Output Message</text>
        <code
          className={
            "w-full font-mono text-sm " +
            (error ? "text-red-500" : "text-black")
          }
        >
          {error ? error : output}
          <br />
          <form
            className="flex gap-1 items-center"
            onSubmit={terminalCodeSubmit}
          >
            <p className="text-black">{">>"}</p>
            <input
            
              value={terminalCode}
              name="terminalCode"
              onChange={(e) => setTerminalCode(e.target.value)}
              className="text-black bg-transparent border-none outline-none"
              autoComplete="off"
              placeholder="..."
            />
          </form>
        </code>
        </div>
      )}
    </pre>
  );
}
