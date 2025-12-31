import styles from './styles.module.scss'

export const Container = ({ children }) => {
    return (
        <div className={styles.container}>{children}</div>
    )
}
