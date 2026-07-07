import styles from './styles.module.scss'

export default function SectionMenu({ options, value, onChange }) {
    return (
        <div className={styles.filters}>
            {options.map(opt => (
                <button
                    key={opt.value}
                    type="button"
                    className={`${styles.filterBtn} ${value === opt.value ? styles.active : ''}`}
                    onClick={() => onChange(opt.value)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    )
}
