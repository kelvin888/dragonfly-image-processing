export type GeneratedUrl = {
    key: string;
    url: string
}
export type GenerateUrlResponse = {
    data: GeneratedUrl
}

export type StageFileResponse = {
    data: {
        dragonfly: string;
    };
}

export type StartProcessingResponse = {
    data: {
        results: string
    }
}

export type CheckStatusResponse = {
    data: {
        results: string
    }
}
