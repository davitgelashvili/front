import styles from './styles.module.scss'

export default function InputText({ title, type, name, value, placeholder, onChange, errorr }) {
    switch (type) {
        case 'select':
            return (
                <label className={`${styles.inputtext}`}>
                    <p className={`${styles.inputtext__title}`}>{title}</p>
                    <select onChange={onChange} className={`${styles.inputtext__input} box`}>
                        <option value={'published'}>published</option>
                    </select>
                    {errorr && <p>{errorr}</p>}
                </label>
            )
            break;
        case 'textarea':
            return (
                <label className={`${styles.inputtext}`}>
                    <p className={`${styles.inputtext__title}`}>{title}</p>
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
                    <p className={`${styles.inputtext__title}`}>{title}</p>
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
