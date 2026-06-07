import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useApi from '../../http/useApi'
import { useAuth } from '../../context/AuthContext'
import styles from './Stats.module.scss'
import Loader from '../../components/ui/Loader'

const CARDS = [
    { key: 'totalUsers',   label: 'კლიენტები',    icon: '👤', bg: '#eff6ff', adminOnly: true },
    { key: 'totalHuds',    label: 'HUD-ები',       icon: '🎪', bg: '#f0fdf4' },
    { key: 'totalEvents',  label: 'ივენთები',      icon: '📅', bg: '#fef9c3' },
    { key: 'totalBatches', label: 'კალათები',      icon: '🎫', bg: '#fdf4ff' },
    { key: 'totalTickets', label: 'გაყიდული ბ.',   icon: '✅', bg: '#f0fdf4' },
    { key: 'totalRevenue', label: 'შემოსავალი',    icon: '💰', bg: '#fff7ed', prefix: '₾' },
]

const STATUS_CLS = {
    active: 'active', valid: 'valid', validated: 'validated',
    used: 'used', cancelled: 'cancelled',
}

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric' })
}

function DailySalesChart({ data }) {
    const [tooltip, setTooltip] = useState(null)

    if (!data?.length) return null

    const W = 800, H = 140, pad = { l: 40, r: 16, t: 10, b: 28 }
    const innerW = W - pad.l - pad.r
    const innerH = H - pad.t - pad.b

    const maxRev = Math.max(...data.map(d => Number(d.revenue)), 1)
    const maxTkt = Math.max(...data.map(d => Number(d.tickets)), 1)

    const xStep = innerW / Math.max(data.length - 1, 1)

    const revPoints = data.map((d, i) => ({
        x: pad.l + i * xStep,
        y: pad.t + innerH - (Number(d.revenue) / maxRev) * innerH,
        d,
    }))
    const tktPoints = data.map((d, i) => ({
        x: pad.l + i * xStep,
        y: pad.t + innerH - (Number(d.tickets) / maxTkt) * innerH,
        d,
    }))

    const toPath = pts => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

    // show every ~7th label
    const labelStep = Math.ceil(data.length / 7)

    return (
        <div className={styles.chartWrap} style={{ position: 'relative' }}>
            <svg viewBox={`0 0 ${W} ${H}`} className={styles.chartSvg}>
                {/* Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map(f => (
                    <line key={f}
                        x1={pad.l} y1={pad.t + innerH * (1 - f)}
                        x2={W - pad.r} y2={pad.t + innerH * (1 - f)}
                        stroke="#f3f4f6" strokeWidth="1"
                    />
                ))}

                {/* Revenue area */}
                <path
                    d={`${toPath(revPoints)} L ${revPoints[revPoints.length - 1].x} ${pad.t + innerH} L ${pad.l} ${pad.t + innerH} Z`}
                    fill="#111" fillOpacity="0.06"
                />
                <path d={toPath(revPoints)} fill="none" stroke="#111" strokeWidth="2" strokeLinejoin="round" />

                {/* Tickets line */}
                <path d={toPath(tktPoints)} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 3" strokeLinejoin="round" />

                {/* Hover points + labels */}
                {revPoints.map((p, i) => (
                    <g key={i}>
                        {i % labelStep === 0 && (
                            <text x={p.x} y={H - 6} textAnchor="middle" className={styles.chartAxis}>
                                {String(p.d.day).slice(5)}
                            </text>
                        )}
                        <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#111" strokeWidth="1.5"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={e => setTooltip({ x: e.clientX, y: e.clientY, d: p.d })}
                            onMouseLeave={() => setTooltip(null)}
                        />
                    </g>
                ))}

                {/* Y axis label */}
                <text x={pad.l - 4} y={pad.t} textAnchor="end" className={styles.chartAxis}>
                    ₾{Math.round(maxRev).toLocaleString('ka-GE')}
                </text>
                <text x={pad.l - 4} y={pad.t + innerH} textAnchor="end" className={styles.chartAxis}>0</text>
            </svg>

            {tooltip && (
                <div className={styles.chartTooltip} style={{ left: tooltip.x, top: tooltip.y, position: 'fixed' }}>
                    {String(tooltip.d.day).slice(5)} · ₾{Number(tooltip.d.revenue).toLocaleString('ka-GE')} · {tooltip.d.tickets} ბ.
                </div>
            )}

            <div className={styles.chartLegend}>
                <span><span className={styles.chartDot} style={{ background: '#111' }} />შემოსავალი</span>
                <span><span className={styles.chartDot} style={{ background: '#6366f1' }} />ბილეთები</span>
            </div>
        </div>
    )
}

export const Stats = () => {
    const [stats, setStats]           = useState(null)
    const [recent, setRecent]         = useState([])
    const [revenueByHud, setRevHud]   = useState([])
    const [dailySales, setDaily]      = useState([])
    const { isToken, userRole } = useAuth()
    const { request } = useApi(isToken)
    const isAdmin = userRole === 'Admin'
    const url = isAdmin ? '/dashboard/stats' : '/panel/stats'

    useEffect(() => {
        async function load() {
            try {
                const res = await request({ url, method: 'GET' })
                if (res.success) {
                    setStats(res.stats)
                    if (res.recentTickets) setRecent(res.recentTickets)
                    if (res.revenueByHud)  setRevHud(res.revenueByHud)
                    if (res.dailySales)    setDaily(res.dailySales)
                }
            } catch {}
        }
        load()
    }, [isToken])

    if (!stats) {
        return (
            <div className="container" style={{ paddingTop: 60, textAlign: 'center' }}>
                <Loader size={48} color="blue" />
            </div>
        )
    }

    const visibleCards = CARDS.filter(c => !c.adminOnly || isAdmin)
    const maxRevenue = revenueByHud.length ? Math.max(...revenueByHud.map(h => Number(h.revenue))) : 1

    return (
        <div className="container">
            <div className={styles.wrap}>
                <p className={styles.sectionTitle}>სტატისტიკა</p>
                <div className={styles.grid}>
                    {visibleCards.map(c => (
                        <div key={c.key} className={styles.card}>
                            <div className={styles.cardIcon} style={{ background: c.bg }}>
                                {c.icon}
                            </div>
                            <div className={styles.cardBody}>
                                <p className={styles.cardNum}>
                                    {c.prefix}{Number(stats[c.key] ?? 0).toLocaleString('ka-GE')}
                                </p>
                                <p className={styles.cardLabel}>{c.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Daily sales chart */}
                {isAdmin && dailySales.length > 0 && (
                    <>
                        <p className={styles.sectionTitle}>გაყიდვები — ბოლო 30 დღე</p>
                        <DailySalesChart data={dailySales} />
                    </>
                )}

                {/* Revenue by HUD */}
                {revenueByHud.length > 0 && (
                    <>
                        <p className={styles.sectionTitle}>შემოსავალი HUD-ების მიხედვით</p>
                        <div className={styles.hudRevenueWrap}>
                            {revenueByHud.map(h => {
                                const pct = maxRevenue > 0 ? (Number(h.revenue) / maxRevenue) * 100 : 0
                                return (
                                    <div key={h.id} className={styles.hudRow}>
                                        <div className={styles.hudLabel}>
                                            <Link to={`/hud/${h.id}`} className={styles.hudLink}>{h.title}</Link>
                                            <span className={styles.hudTickets}>{h.ticket_count} ბ.</span>
                                        </div>
                                        <div className={styles.hudBarWrap}>
                                            <div className={styles.hudBar} style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className={styles.hudRevNum}>₾{Number(h.revenue).toLocaleString('ka-GE')}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                )}

                {/* Recent tickets */}
                {recent.length > 0 && (
                    <>
                        <p className={styles.sectionTitle}>ბოლო ბილეთები</p>
                        <div className={styles.tableWrap}>
                            <div className={styles.tableHead} style={{ gridTemplateColumns: isAdmin ? '2fr 2fr 1.5fr 1fr 1fr 80px' : '2fr 2fr 1fr 1fr 80px' }}>
                                <span>HUD</span>
                                <span>ივენთი</span>
                                {isAdmin && <span>კლიენტი</span>}
                                <span>ფასი</span>
                                <span>სტატუსი</span>
                                <span>თარიღი</span>
                            </div>
                            {recent.map(t => (
                                <div key={t.ticket_id} className={styles.tableRow} style={{ gridTemplateColumns: isAdmin ? '2fr 2fr 1.5fr 1fr 1fr 80px' : '2fr 2fr 1fr 1fr 80px' }}>
                                    <span className={styles.cell}>{t.hud_title}</span>
                                    <span className={styles.cell}>{t.event_title}</span>
                                    {isAdmin && <span className={styles.cell} style={{ color: '#888' }}>{t.owner_name || '—'}</span>}
                                    <span className={styles.cell} style={{ fontWeight: 600 }}>₾{t.batch_price}</span>
                                    <span className={styles.cell}>
                                        <span className={`${styles.statusBadge} ${styles[STATUS_CLS[t.status] || 'active']}`}>
                                            {t.status}
                                        </span>
                                    </span>
                                    <span className={`${styles.cell} ${styles.cellMono}`}>{formatDate(t.sold_at)}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
