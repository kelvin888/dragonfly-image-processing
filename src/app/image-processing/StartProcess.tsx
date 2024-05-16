import React from 'react';
import Button from "@/components/button";

interface StartProcessProps {
    selectedFiles: FileList | null;
    onStartProcess: () => void;
    isProcessing?: boolean
}

const StartProcess: React.FC<StartProcessProps> = ({ selectedFiles, onStartProcess, isProcessing }) => (
    <div className="flex flex-col items-center">
        <h3 className="text-2xl mb-4">
            Your <span>{selectedFiles && selectedFiles.length > 0 ? "files are" : "file is"} </span>
            ready for processing.
        </h3>
        <Button size="medium" onClick={onStartProcess} isLoading={isProcessing}>Start Processing</Button>
    </div>
);

export default StartProcess;
