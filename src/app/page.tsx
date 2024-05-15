"use client";
import React, { useState } from "react";
import GeneratePreSignedURL from "./image-processing/GeneratePreSignedURL";
import StageFileInS3 from "./image-processing/StageFileInS3";
import StartProcess from "./image-processing/StartProcess";
import CheckStatus from "./image-processing/CheckStatus";
import { GeneratedUrl } from "@/types/dragonfly";
import { useMutation } from "@tanstack/react-query";
import { dragonflyService } from "@/api/services/dragonfly";

export default function Home() {
  const [step, setStep] = useState(1);
  const [generatedUrl, setGeneratedUrl] = useState<GeneratedUrl>();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [taskId, setTaskId] = useState<string>('');

  const stagingMutation = useMutation({
    mutationFn: dragonflyService.stageFile,
    onSuccess: (data) => {
      console.log("staging data", data)
      setStep(3);
    }
  })

  const handleFilesChanged = (files: FileList | null) => {
    setSelectedFiles(files);
  };

  const handleURLGenerated = (urlData: GeneratedUrl) => {
    setGeneratedUrl(urlData);
    setStep(2);
  };

  const handleSubmitFiles = async () => {
    console.log({ generatedUrl })
    if (generatedUrl && selectedFiles) {
      stagingMutation.mutate({
        fileToUpload: selectedFiles[0],
        signedUrlData: generatedUrl
      })
    }
  };

  const handleStartProcessing = async () => {
    // Logic to start processing files using the key
    // Assume we get a taskId in response
    const response = await fetch('https://staging.api.dragonflyai.co/pipeline/assets/process', {
      method: 'POST',
      headers: {
        'Authorization': 'api_key',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        key: generatedUrl?.key ?? "",
        pipeline: 'dragonfly-img-basic'
      })
    });
    const data = await response.json();
    setTaskId(data.taskId);
    setStep(4);
  };

  return (
    <div>
      {step === 1 && <GeneratePreSignedURL onURLGenerated={handleURLGenerated} />}
      {step === 2 && <StageFileInS3 onFilesChanged={handleFilesChanged} onSubmit={handleSubmitFiles} />}
      {step === 3 && <StartProcess selectedFiles={selectedFiles} onStartProcess={handleStartProcessing} />}
      {step === 4 && <CheckStatus taskId={taskId} />}
    </div>
  );
}
