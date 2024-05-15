import React, { useEffect } from 'react';
import Spinner from "@/components/spinner";
import { useMutation } from '@tanstack/react-query';
import { dragonflyService } from '@/api/services/dragonfly';
import { GeneratedUrl } from '@/types/dragonfly';



interface GeneratePreSignedURLProps {
    onURLGenerated: (urlData: GeneratedUrl) => void;
}

const GeneratePreSignedURL: React.FC<GeneratePreSignedURLProps> = ({ onURLGenerated }) => {

    const { isError, error, isPending, mutate } = useMutation({
        mutationFn: dragonflyService.generateUrl,
        onSuccess: (data) => {
            onURLGenerated(data.data);
        },
    })

    useEffect(() => {
        mutate()
    }, [mutate])


    if (isError) {
        return <div className='text-primary-900'>{error.message}</div>
    }

    return (
        <div className="relative">
            <h6 className="text-center">Initializing, please wait...</h6>
            {isPending &&
                <Spinner className="mx-auto my-4" />
            }
        </div>
    );
};

export default GeneratePreSignedURL;
