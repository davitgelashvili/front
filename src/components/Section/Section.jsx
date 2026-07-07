import styles from './Section.module.scss'

export const Section = ({ children, title, elements }) => {
    return (
        <section className={styles.section}>
            <div className={styles.section__head}>
                <div className='row align-items-center'>
                    {title && <div className='col'><h1 className={styles['section__head--title']}>{title}</h1></div>}
                    {elements && (
                        <div className='col-auto'>
                            <div className='row align-items-center'>
                                {/* {elements?.map((el) => el)} */}
                                {elements}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {children}
        </section>
    )
}