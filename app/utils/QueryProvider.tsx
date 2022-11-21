"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactChildren } from "@/lib/types"

const queryClient = new QueryClient();

export default function QueryProvider({children}: ReactChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}