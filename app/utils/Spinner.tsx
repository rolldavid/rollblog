import styles from './Spinner.module.css'
export default function Spinner() {
    return (
        <div className={styles.container}>
            <div className={styles.loadingSpinner} />
        </div>
        )
}