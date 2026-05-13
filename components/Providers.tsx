"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import store from "@/lib/store";
import AuthProvider from "./authProvider";

export default function Providers({children}:{children:React.ReactNode}){
    const [queryClient]=useState(new QueryClient())
      return (
            <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
         <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
               <AuthProvider> 
                   {children} 
                    </AuthProvider>
                </ThemeProvider>
            </QueryClientProvider>
            </ReduxProvider>
      )
}




