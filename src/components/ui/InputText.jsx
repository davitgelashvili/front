import { useRef } from 'react'
import styles from './styles.module.scss'

function toDateInputValue(value) {
    if (!value) return ''
    return value.toString().slice(0, 10)
}

export default function InputText({ title, type, name, value, placeholder, onChange, errorr, options }) {
    const dateRef = useRef(null)

    switch (type) {
        case 'date':
            return (
                <label className={`${styles.inputtext}`} >
                    {title && <p className={`${styles.inputtext__title}`}>{title}</p>}
                    <input
                        ref={dateRef}
                        type="date"
                        name={name}
                        value={toDateInputValue(value)}
                        onChange={onChange}
                        onClick={() => dateRef.current?.showPicker()}
                        className={`${styles.inputtext__input} box`}
                    />
                    {errorr && <p>{errorr}</p>}
                </label>
            )
        case 'select':
            return (
                <label className={`${styles.inputtext}`}>
                    {title && <p className={`${styles.inputtext__title}`}>{title}</p>}
                    <select name={name} value={value} onChange={onChange} className={`${styles.inputtext__input} box`}>
                        <option value="">აირჩიეთ</option>
                        {options && options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    {errorr && <p>{errorr}</p>}
                </label>
            )
            break;
        case 'textarea':
            return (
                <label className={`${styles.inputtext}`}>
                    {title && <p className={`${styles.inputtext__title}`}>{title}</p>}
                    <textarea
                        type={type}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        className={`${styles.inputtext__input} box`}
                    />
                    {errorr && <p>{errorr}</p>}
                </label>
            )
            break;
        default:
            return (
                <label className={`${styles.inputtext}`}>
                    {title && <p className={`${styles.inputtext__title}`}>{title}</p>}
                    <input
                        type={type}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        className={`${styles.inputtext__input} box`}
                    />
                    {errorr && <p>{errorr}</p>}
                </label>
            )
            break;
    }
}
