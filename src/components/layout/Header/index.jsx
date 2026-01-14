import React from 'react'
import { Navigation } from './Navigation'
import styles from './styles.module.scss'
import { Container } from '../../Container'
import { UserMenu } from './UserMenu'

export const Header = () => {
    return (
        <header className={styles.header}>
            <Container>
                <Navigation />
                <UserMenu />
            </Container>
        </header>
    )
}
