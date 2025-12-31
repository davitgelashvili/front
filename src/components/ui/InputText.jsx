import styles from './styles.module.scss'

export default function InputText({title, type, name, value, placeholder, onChange, errorr}) {
    return (
        <label className={`${styles.inputtext}`}>
            <p  className={`${styles.inputtext__title}`}>{title}</p>
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
}
