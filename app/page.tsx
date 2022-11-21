
import LandingScroll from "./posts/[category]/components/LandingScroll"
import QueryProvider from "./utils/QueryProvider"
import styles from "@/styles/Home.module.css"

export default function Page() {
    return (
        <QueryProvider>
            <LandingScroll />
        </QueryProvider>
    )
}


