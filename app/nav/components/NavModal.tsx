"use client"

import { useEffect, useState } from "react"
import { Dispatch, SetStateAction, SyntheticEvent } from "react"
import NavLinks from "./NavLinks"
import styles from "./NavModal.module.css"

export default function NavModal({setShowModal, isLoggedIn}: {setShowModal: Dispatch<SetStateAction<boolean>>, isLoggedIn: string | undefined}) {
    const [isMounted, setIsMounted] = useState(false)
    const handleModalClose = () => {
        setShowModal(false)
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted) {
            window.addEventListener("click", handleModalClose)
        }
        return () => {
            window.removeEventListener("click", handleModalClose)
        }
    }, [isMounted])

    return (
        <div className={styles.container}>
           <NavLinks isLoggedIn={isLoggedIn}/>
        </div>
    )
}