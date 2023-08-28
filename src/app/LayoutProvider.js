"use client"
import React from 'react'
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
export default function LayoutProvider({children}) {
  return (
    <div>
        
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </div>
  )
}
