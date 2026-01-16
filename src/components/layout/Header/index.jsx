import React from 'react'
import { Navigation } from './Navigation'
import styles from './styles.module.scss'
import { Container } from '../../Container'
import { UserMenu } from './UserMenu'
import { Logo } from './Logo'

export const Header = () => {
    return (
        <header className={`${styles.header} bordercolor`}>
            <Container>
                <div className='row'>
                    <div className='col'>
                        <Logo />
                    </div>
                    <div className='col-auto d-flex align-items-center'>
                        <Navigation />
                        <UserMenu />
                    </div>
                </div>
            </Container>
        </header>
    )
}
