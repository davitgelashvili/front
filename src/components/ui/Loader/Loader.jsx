import styles from './styles.module.scss'

export default function Loader({ size = 16, color = '#fff' }) {
    return (
        <span
            className={styles.loader}
            style={{
                width: size,
                height: size,
                borderColor: `${color}66`,
                borderTopColor: color,
            }}
        />
    )
}
