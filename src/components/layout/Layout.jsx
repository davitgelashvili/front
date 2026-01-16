import { Outlet } from "react-router-dom"
import styles from './styles.module.scss'
import { HudCard } from "./HudCard"

export const Layout = () => {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.content__in}>
                    <div className="row">
                        <div className="col-3">
                            <div className="box">
                                <HudCard />
                            </div>
                        </div>
                        <div className="col-9">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}