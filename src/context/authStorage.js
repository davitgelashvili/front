export const auth = {
    setSession({ accessToken, user }) {
        sessionStorage.setItem('accessToken', accessToken)
        sessionStorage.setItem('user', JSON.stringify(user))
    },

    getAccessToken() {
        return sessionStorage.getItem('accessToken') || ''
    },

    getUser() {
        const raw = sessionStorage.getItem('user')
        return raw ? JSON.parse(raw) : null
    },

    clear() {
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('user')
    },
}
