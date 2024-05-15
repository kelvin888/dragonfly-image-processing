import React, { useState } from 'react';

interface FilePickerProps {
    multiple?: boolean;
    onFilesChanged: (files: FileList | null) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ multiple = false, onFilesChanged }) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedFiles(files);
        onFilesChanged(files);
    };

    const handleRemoveFile = (index: number) => {
        if (!selectedFiles) return;

        const updatedFiles = Array.from(selectedFiles).filter((file, i) => i !== index);
        const newFileList = createFileList(updatedFiles);
        setSelectedFiles(newFileList);
        onFilesChanged(newFileList);
    };

    const createFileList = (files: File[]): FileList => {
        const dataTransfer = new DataTransfer();
        files.forEach(file => {
            dataTransfer.items.add(file);
        });
        return dataTransfer.files;
    };

    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor="fileInput" className="border border-dashed border-primary-900 p-4">
                Click to select files
            </label>
            <input
                id="fileInput"
                type="file"
                multiple={multiple}
                accept='image/jpeg'
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the input element
            />
            <div>
                {selectedFiles && (
                    <ul>
                        {Array.from(selectedFiles).map((file, index) => (
                            <li className='border border-gray-400 flex justify-between p-2' key={index}>
                                <div>{file.name}</div>
                                <button className='bg-gray-400 rounded-xl px-2 text-xs text-black ml-auto' onClick={() => handleRemoveFile(index)}>X</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FilePicker;
