"use client"
import Image from "next/image"
import { SyntheticEvent, useContext } from "react"
import { ThemeContext } from "app/context/ThemeProvider"

import dark from "../assets/toggle-dark.png"
import light from "../assets/toggle-light.png"
import styles from "./ToggleTheme.module.css"

export default function ToggleTheme() {
    const theme = useContext(ThemeContext)

    const updateTheme = (e: SyntheticEvent) => {
        e.preventDefault();
        const currentTheme = theme?.theme
        theme?.setTheme(theme?.theme === "light" ? "dark" : "light")
        window.localStorage.setItem("theme", theme?.theme === "light" ? "dark" : "light");
    }
    
    return (
        <Image 
            src={theme?.theme === "light" ? dark : light} 
            alt={"light toggle switch"} 
            className={styles.toggle} 
            width={30} 
            height={30}
            aria-label={`Change to ${theme?.theme === "light" ? "dark" : "light"} mode`}
            title={`Change to ${theme?.theme === "light" ? "dark" : "light"} mode`}
            onClick={updateTheme}
        />
    )
}