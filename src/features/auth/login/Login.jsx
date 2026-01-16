import styles from './styles.module.scss'
import Form from './Form'

export default function Login() {
    return (
        <div className={styles.auth}>
            <div className={`${styles.login} box`}>
                <h1>ავტორიზაცია</h1>
                <Form />
            </div>
        </div>
    )
}
