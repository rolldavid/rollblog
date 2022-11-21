"use client"

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ReactChildren } from "@/lib/types";

interface ContextInterface {
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<ContextInterface | null>(null)

export const ThemeContextProvider = ({children}: ReactChildren) => {
    const [theme, setTheme] = useState("")
    const context = {
        theme: theme,
        setTheme: setTheme
    }
    return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
}