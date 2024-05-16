import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { dragonflyService } from "@/api/services/dragonfly";
import { GeneratedUrl } from "@/types/dragonfly";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { parseError } from "@/utils/parseErrorMessage";

export const useImageProcessing = () => {
  const [step, setStep] = useState<number>(1);
  const [generatedUrl, setGeneratedUrl] = useState<GeneratedUrl | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [taskId, setTaskId] = useState<string>("");

  const stagingMutation = useMutation({
    mutationFn: dragonflyService.stageFile,
    onSuccess: () => {
      setStep(3);
      toast.success("Files staged successfully!");
    },
    onError: (error: AxiosError) => {
      toast.error(parseError(error));
    }
  });

  const processMutation = useMutation({
    mutationFn: dragonflyService.startProcessing,
    onSuccess: () => {
      setStep(4);
      toast.success("Processing started!");
    },
    onError: (error: AxiosError) => {
      toast.error(parseError(error));
    }
  });

  const handleFilesChanged = (files: FileList | null) => {
    setSelectedFiles(files);
  };

  const handleURLGenerated = (urlData: GeneratedUrl) => {
    setGeneratedUrl(urlData);
    setStep(2);
  };

  const handleSubmitFiles = async () => {
    if (generatedUrl && selectedFiles) {
      stagingMutation.mutate({
        filesToUpload: selectedFiles,
        signedUrlData: generatedUrl
      });
    } else {
      toast.error("You must select at least one file to continue");
    }
  };

  const handleStartProcessing = async () => {
    if (generatedUrl) {
      processMutation.mutate(generatedUrl.key);
    } else {
      toast.error("App not properly initialized, please reload");
    }
  };

  return {
    step,
    selectedFiles,
    handleFilesChanged,
    handleURLGenerated,
    handleSubmitFiles,
    handleStartProcessing,
    isStaging: stagingMutation.isPending,
    isProcessing: processMutation.isPending,
    taskId
  };
};
