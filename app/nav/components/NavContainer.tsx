"use client"

import { useState, useEffect, useContext } from "react"
import { ThemeContext } from "app/context/ThemeProvider";
import Image from "next/image"
import Link from "next/link"

import NavLinks from "./NavLinks"
import styles from "./NavContainer.module.css"
import dark from "../assets/burger-dark.png"
import light from "../assets/burger-light.png"
import  NavModal from "./NavModal"

export default function NavContainer() {
    const theme = useContext(ThemeContext)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const savedTheme = window.localStorage.getItem("theme");
        if (savedTheme) {
            theme?.setTheme(savedTheme)
        } else if (document.body.dataset.theme) {
            theme?.setTheme(document.body.dataset.theme)
            window.localStorage.setItem("theme", document.body.dataset.theme);
        }
        
    }, []);

    useEffect(() => {
        document.body.dataset.theme = theme?.theme
    }, [theme?.theme])

    return (
        <>
            <div className={styles.desktop}>
                <NavLinks />
            </div>
            <div className={styles.mobile}>
                <Link href={"/"} className={styles.logoContainer}>
                    <h2 className={styles.logo}>ryo</h2>
                </Link>
               
                <Image 
                    src={theme?.theme === "light" ? dark : light} 
                    alt={"Main menu hamburger"} 
                    className={styles.burger}
                    width={25} 
                    height={25}
                    aria-label={`Main Menu`}
                    title={`Main Menu`}
                    onClick={() => setShowModal(true)}
                />
            </div>
            {showModal && <NavModal setShowModal={setShowModal}/>}
        </>
    )
}