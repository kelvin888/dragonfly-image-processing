"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/client/reactQueryClient";

function Providers({ children }: React.PropsWithChildren): React.JSX.Element {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider >
    );
}

export default Providers;