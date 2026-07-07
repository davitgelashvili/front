import { useRef } from 'react'
import styles from './styles.module.scss'

function toDateInputValue(value) {
    if (!value) return ''
    return value.toString().slice(0, 10)
}

function ClearIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    )
}

export default function InputText({ title, type, name, value, placeholder, onChange, errorr, options }) {
    const dateRef = useRef(null)

    const hasValue = value !== undefined && value !== null && value !== ''
    const clear = () => onChange?.({ target: { name, value: '' } })

    const clearBtn = (modifier) => hasValue && (
        <button
            type="button"
            className={`${styles.inputtext__clear} ${modifier ? styles[`inputtext__clear--${modifier}`] : ''}`}
            onClick={clear}
            title="გასუფთავება"
        >
            <ClearIcon />
        </button>
    )

    switch (type) {
        case 'date':
            return (
                <label className={`${styles.inputtext}`} >
                    {title && <p className={`${styles.inputtext__title}`} >{title}</p>}
                    <span className={styles.inputtext__field}>
                        <input
                            ref={dateRef}
                            type="date"
                            name={name}
                            value={toDateInputValue(value)}
                            onChange={onChange}
                            onClick={() => dateRef.current?.showPicker()}
                            className={`${styles.inputtext__input} box`}
                        />
                        {clearBtn('date')}
                    </span>
                    {errorr && <p>{errorr}</p>}
                </label>
            )
        case 'select':
            return (
                <label className={`${styles.inputtext}`}>
                    {title && <p className={`${styles.inputtext__title}`}>{title}</p>}
                    <span className={styles.inputtext__field}>
                        <select name={name} value={value} onChange={onChange} className={`${styles.inputtext__input} box`}>
                            <option value="">აირჩიეთ</option>
                            {options && options.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        {clearBtn('select')}
                    </span>
                    {errorr && <p>{errorr}</p>}
                </label>
            )
        case 'textarea':
            return (
                <label className={`${styles.inputtext}`}>
                    {title && <p className={`${styles.inputtext__title}`}>{title}</p>}
                    <span className={styles.inputtext__field}>
                        <textarea
                            type={type}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange}
                            className={`${styles.inputtext__input} box`}
                        />
                        {clearBtn('textarea')}
                    </span>
                    {errorr && <p>{errorr}</p>}
                </label>
            )
        default:
            return (
                <label className={`${styles.inputtext}`}>
                    {title && <p className={`${styles.inputtext__title}`}>{title}</p>}
                    <span className={styles.inputtext__field}>
                        <input
                            type={type}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange}
                            className={`${styles.inputtext__input} box`}
                        />
                        {clearBtn()}
                    </span>
                    {errorr && <p>{errorr}</p>}
                </label>
            )
    }
}
