import { Outlet } from "react-router-dom"
import { Container } from "./Container"
import Sidebar from "./Sidebar/Sidebar"
import styles from './styles.module.scss'

export const Layout = () => {
    return (
        <>
            <div className={styles.dashboard}>
                <Sidebar />
                <Container>
                    <Outlet />
                </Container>
            </div>
        </>
    )
}