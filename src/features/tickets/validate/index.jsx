import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import useApi from '../../../http/useApi'
import { useAuth } from '../../../context/AuthContext'
import CustomButton from '../../../components/ui/CustomButton'
import InputText from '../../../components/ui/InputText'
import styles from './styles.module.scss'

const STATUS = {
    active:    { bg: '#e6f4ea', color: '#2e7d32', label: 'აქტიური' },
    valid:     { bg: '#e6f4ea', color: '#2e7d32', label: 'აქტიური' },
    validated: { bg: '#dbeafe', color: '#1d4ed8', label: 'სკანირებული ✓' },
    used:      { bg: '#f3f4f6', color: '#6b7280', label: 'გამოყენებული' },
    cancelled: { bg: '#fce8e6', color: '#c62828', label: 'გაუქმებული' },
}

export default function ValidateTicket() {
    const { isToken } = useAuth()
    const { request } = useApi(isToken)

    const [ticketId, setTicketId]   = useState('')
    const [result, setResult]       = useState(null)
    const [error, setError]         = useState('')
    const [loading, setLoading]     = useState(false)
    const [scanning, setScanning]   = useState(false)

    const scannerRef = useRef(null)
    const html5Ref   = useRef(null)

    async function validate(id) {
        const clean = id.trim()
        if (!clean) return
        setError('')
        setResult(null)
        setLoading(true)
        try {
            const res = await request({ url: `/dashboard/ticket/${clean}/validate`, method: 'POST' })
            if (res.success) setResult(res)
            else setError(res.message || 'ბილეთი ვერ მოიძებნა')
        } catch {
            setError('ბილეთი ვერ მოიძებნა')
        } finally {
            setLoading(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        validate(ticketId)
    }

    async function startScanner() {
        setScanning(true)
        setResult(null)
        setError('')
    }

    useEffect(() => {
        if (!scanning) return

        const qr = new Html5Qrcode('qr-reader')
        html5Ref.current = qr

        qr.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
                qr.stop().then(() => {
                    setScanning(false)
                    setTicketId(decodedText)
                    validate(decodedText)
                })
            },
            () => {}
        ).catch(err => {
            console.error(err)
            setScanning(false)
            setError('კამერაზე წვდომა ვერ მოხერხდა')
        })

        return () => {
            qr.stop().catch(() => {})
        }
    }, [scanning])

    function stopScanner() {
        html5Ref.current?.stop().catch(() => {})
        setScanning(false)
    }

    const ticket = result?.ticket
    const buyer  = result?.buyer
    const st     = ticket ? (STATUS[ticket.status] || STATUS.active) : null

    return (
        <div className="container">
            <div className={`box ${styles.wrap}`}>
                <h1 className={styles.title}>ბილეთის ვალიდაცია</h1>

                {/* Manual input */}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputWrap}>
                        <InputText
                            title="Ticket ID"
                            type="text"
                            value={ticketId}
                            placeholder="შეიყვანეთ Ticket ID"
                            onChange={e => setTicketId(e.target.value)}
                        />
                    </div>
                    <div className={styles.formBtns}>
                        <CustomButton type="submit" style="dark" loading={loading} disabled={!ticketId.trim()}>
                            შემოწმება
                        </CustomButton>
                        <button type="button" className={styles.scanBtn} onClick={scanning ? stopScanner : startScanner}>
                            {scanning ? '⏹ გაჩერება' : '📷 QR სკანერი'}
                        </button>
                    </div>
                </form>

                {/* QR scanner */}
                {scanning && (
                    <div className={styles.scannerWrap}>
                        <div id="qr-reader" className={styles.scannerBox} />
                        <p className={styles.scanHint}>მიუახლოვე QR კოდი კამერას</p>
                    </div>
                )}

                {/* Error */}
                {error && <div className={styles.errorBox}>{error}</div>}

                {/* Result */}
                {ticket && (
                    <div className={styles.result}>
                        {/* Status banner */}
                        <div
                            className={styles.statusBanner}
                            style={{ background: st.bg, color: st.color }}
                        >
                            <span className={styles.statusLabel}>{st.label}</span>
                            <span className={styles.ticketIdBadge}>#{ticket.ticket_id}</span>
                        </div>

                        <div className={styles.grid}>
                            {/* Ticket info */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>ბილეთის ინფო</h3>
                                <Row label="შოუ"      value={ticket.hud_title} />
                                <Row label="სეანსი"   value={ticket.event_title} />
                                <Row label="თარიღი"   value={ticket.event_date?.toString().slice(0, 16).replace('T', ' ')} />
                                <Row label="კატეგორია" value={`${ticket.batch_name} — ${ticket.batch_price} ₾`} />
                                <Row label="გაყიდვა"  value={ticket.sold_at?.toString().slice(0, 16).replace('T', ' ')} />
                                <Row label="პლატფორმა" value={ticket.platform || '—'} />
                            </div>

                            {/* Buyer info */}
                            <div className={styles.section}>
                                <h3 className={styles.sectionTitle}>მფლობელი</h3>
                                {buyer ? (
                                    <>
                                        <Row label="სახელი"      value={buyer.name} />
                                        <Row label="პირადი №"    value={buyer.personal_id} />
                                        <Row
                                            label="ვალიდური"
                                            value={buyer.is_valid ? '✅ დიახ' : '❌ არა'}
                                            valueStyle={{ color: buyer.is_valid ? '#16a34a' : '#dc2626', fontWeight: 600 }}
                                        />
                                        <Row label="მონეტები"    value={`🪙 ${buyer.coins}`} />
                                    </>
                                ) : (
                                    <Row label="Buyer ID" value={ticket.buyer_id} />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function Row({ label, value, valueStyle }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f3f4f6', fontSize: 14 }}>
            <span style={{ color: '#888' }}>{label}</span>
            <span style={{ fontWeight: 500, ...valueStyle }}>{value}</span>
        </div>
    )
}
