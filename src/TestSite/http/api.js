import axios from 'axios'

const BASE    = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
const EXP_KEY = import.meta.env.VITE_EXPORT_KEY || ''

const exportApi = axios.create({
    baseURL: `${BASE}/export`,
    headers: { 'x-api-key': EXP_KEY },
})

const testApi_raw = axios.create({ baseURL: `${BASE}/test` })
const pubApi      = axios.create({ baseURL: BASE })

export const testApi = {
    // ── Public show data — export API ──
    shows:  ()         => exportApi.get('/hud'),
    show:   (id)       => exportApi.get(`/hud/${id}`),
    event:  (id)       => exportApi.get(`/event/${id}`),

    // ── Buying flow — test API ──
    users:             ()                  => testApi_raw.get('/users'),
    buy:               (batchId, userId)   => testApi_raw.post('/buy', { batchId, userId }),
    tickets:           (userId)            => testApi_raw.get(`/tickets/${userId}`),
    verificationStatus:(hudId, userId)     => testApi_raw.get(`/verification-status?hudId=${hudId}&userId=${userId}`),
    verifyRequest:     (hudId, buyerId)    => pubApi.post('/verification/request', { hud_id: hudId, buyer_id: buyerId }),
}
