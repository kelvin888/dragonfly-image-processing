"use client";
import React from "react";
import GeneratePreSignedURL from "./image-processing/GeneratePreSignedURL";
import StageFileInS3 from "./image-processing/StageFileInS3";
import StartProcess from "./image-processing/StartProcess";
import CheckStatus from "./image-processing/CheckStatus";
import { useImageProcessing } from "@/hooks/useImageProcessing";

const Home: React.FC = () => {
  const {
    step,
    selectedFiles,
    handleFilesChanged,
    handleURLGenerated,
    handleSubmitFiles,
    handleStartProcessing,
    isStaging,
    isProcessing,
    taskId
  } = useImageProcessing();

  return (
    <div>
      {step === 1 && <GeneratePreSignedURL onURLGenerated={handleURLGenerated} />}
      {step === 2 && (
        <StageFileInS3
          onFilesChanged={handleFilesChanged}
          onSubmit={handleSubmitFiles}
          isStaging={isStaging}
        />
      )}
      {step === 3 && (
        <StartProcess
          selectedFiles={selectedFiles}
          onStartProcess={handleStartProcessing}
          isProcessing={isProcessing}
        />
      )}
      {step === 4 && <CheckStatus taskId={taskId} />}
    </div>
  );
};

export default Home;
