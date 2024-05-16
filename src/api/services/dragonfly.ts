import { dragonflyUrls } from "@/constants/apiUrls/dragonfly";
import {
    GenerateUrlResponse,
    StartProcessingResponse,
    CheckStatusResponse,
    GeneratedUrl,
} from "@/types/dragonfly";
import { getFromDragonfly, postToDragonfly } from "../client/dragonfly";
import { postToAws, updateOnAws } from "../client/aws";

type StagingData = {
  signedUrlData: GeneratedUrl, 
  filesToUpload: FileList
}

export const dragonflyService = {
  generateUrl: async () => {
    return await postToDragonfly(dragonflyUrls.GENERATE_URL) as Promise<GenerateUrlResponse>;
  },
  stageFile: async (stagingData: StagingData) => {
const data = stagingData.filesToUpload
    
    return await updateOnAws(`${stagingData.signedUrlData.url}`, data, {
      'Content-Type': 'image/jpeg',
    });
  },
  startProcessing: async (key: string) => {
    return await postToDragonfly(`${dragonflyUrls.START_PROCESSING}?key=${key}&pipeline=dragonfly-img-basic`, {}, {
      'Content-Type': 'application/x-www-form-urlencoded'
    }) as Promise<StartProcessingResponse>;
  },
  checkStatus: async (): Promise<CheckStatusResponse> => {
    return await getFromDragonfly(`${dragonflyUrls.CHECK_STATUS}`);
  }
};
