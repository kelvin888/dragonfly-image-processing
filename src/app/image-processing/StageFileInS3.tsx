import React from 'react';
import FilePicker from "@/components/file-picker";
import Button from "@/components/button";

interface StageFileInS3Props {
    onFilesChanged: (files: FileList | null) => void;
    onSubmit: () => void;
}

const StageFileInS3: React.FC<StageFileInS3Props> = ({ onFilesChanged, onSubmit }) => (
    <div>
        <h5 className="text-center mb-3">
            To select multiple files, hold down the Command key for mac and Shift for windows.
        </h5>
        <FilePicker onFilesChanged={onFilesChanged} multiple />
        <Button className='mt-3' size="medium" onClick={onSubmit}>Submit</Button>
    </div>
);

export default StageFileInS3;
