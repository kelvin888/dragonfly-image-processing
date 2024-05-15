import { dragonflyUrls } from "@/constants/apiUrls/dragonfly";
import {
    GenerateUrlResponse,
    StartProcessingResponse,
    CheckStatusResponse,
    GeneratedUrl,
} from "@/types/dragonfly";
import { getFromDragonfly, postToDragonfly } from "../client/dragonfly";
import { updateOnAws } from "../client/aws";

type StagingData = {
  signedUrlData: GeneratedUrl, 
  fileToUpload: File | null
}

export const dragonflyService = {
  generateUrl: async () => {
    return await postToDragonfly(dragonflyUrls.GENERATE_URL) as Promise<GenerateUrlResponse>;
  },
  stageFile: async (stagingData: StagingData) => {

    return await updateOnAws(`${stagingData.signedUrlData.url}`, stagingData.fileToUpload, {
      'Content-Type': 'image/jpeg',
    });
  },
  startProcessing: async (dragonflyName: string): Promise<StartProcessingResponse> => {
    return await getFromDragonfly(`${dragonflyUrls.START_PROCESSING}/${dragonflyName}`);
  },
  checkStatus: async (dragonflyName: string): Promise<CheckStatusResponse> => {
    return await getFromDragonfly(`${dragonflyUrls.CHECK_STATUS}/${dragonflyName}`);
  }
};
