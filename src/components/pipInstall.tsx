import { useStore } from "../store";
import { useState } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import {
    Download,
    Upload,
    Settings as SettingsIcon,
    Loader,
} from "lucide-react";
declare global {
    interface Window {
        micropip: {
            install: (packages: string, keep_going?: boolean) => Promise<void>;
        };
    }
}

export default function PipInstall() {

    const { setOutput, setError } = useStore();
    const [isLibLoading, setIsLibLoading] = useState(false);

    async function handlePipInstall(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (e) {
            const packageName = e.currentTarget.lib.value;
            if (window.micropip) {
                const lib = packageName.replace("pip install ", "");
                try {
                    setIsLibLoading(true);
                    await window.micropip.install(lib, true);
                    setOutput(`pip install ${lib} successfully installed`);
                    setError(null);
                } catch (e) {
                    if (e instanceof Error) {
                        setError(`Failed to install ${lib}, ${e.message}`);
                    }
                } finally {
                    setIsLibLoading(false);
                }
            }
        }
    }

    return (

        <form
            onSubmit={handlePipInstall}
            style={{flexDirection:'row', display:'flex', alignItems:'center', justifyContent:'center'}}
        >
            <Input
                type="text"
                name="lib"
                placeholder="pip install numpy"
                disabled={isLibLoading}
                style={{width:'200px', backgroundColor:'white',}}
                className="border border-gray-300"
            />
            <Button className="border border-gray-300" style={{marginLeft:'5px', backgroundColor:'#E1C547', color:'black'}} variant="outline" type="submit" disabled={isLibLoading}>
                {isLibLoading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                ) : (
                    <Download className="h-5 w-5" />
                )}
            </Button>
        </form>
    )
}