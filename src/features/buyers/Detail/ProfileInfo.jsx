import CustomButton from '@/components/ui/CustomButton/CustomButton'
import { Section } from '@/components/Section/Section'
import styles from '../styles.module.scss'

function formatDate(d) {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export const ProfileInfo = ({ buyer, isAdmin, id }) => {
    return (
        <Section
            title={'პროფილი'}
            elements={<>
                <div className='col-auto'>
                    <CustomButton url={`/buyers`} style="light">← Buyers</CustomButton>
                </div>
                {isAdmin && (
                    <div className='col-auto'>
                        <CustomButton url={`/buyers/${id}/edit`} style="dark">Edit Buyer</CustomButton>
                    </div>
                )}
            </>}>
            <div className={`box ${styles.buyerCard}`}>
                <div className={styles.buyerCardLeft}>
                    <div className={styles.avatarLg}>{buyer.name[0]?.toUpperCase()}</div>
                    <div>
                        <h2 className={styles.buyerCardName}>{buyer.name}</h2>
                        <p className={styles.buyerCardId}>{buyer.id}</p>
                        <div className={styles.infoRows}>
                            {buyer.personal_id && <p>🪪 {buyer.personal_id}</p>}
                            {buyer.phone && <p>📞 {buyer.phone}</p>}
                            {buyer.email && <p>✉️ {buyer.email}</p>}
                            {buyer.notes && <p style={{ color: '#888', fontStyle: 'italic' }}>{buyer.notes}</p>}
                        </div>
                    </div>
                </div>

                <div className={styles.buyerCardStats}>
                    <div className={styles.statBox}>
                        <p className={styles.statVal}>{buyer.ticket_count}</p>
                        <p className={styles.statLabel}>ბილეთი</p>
                    </div>
                    <div className={styles.statBox}>
                        <p className={styles.statVal}>₾{Number(buyer.total_spent || 0).toLocaleString('ka-GE')}</p>
                        <p className={styles.statLabel}>დახარჯული</p>
                    </div>
                    <div className={styles.statBox}>
                        <p className={styles.statVal} style={{ fontSize: 13 }}>{formatDate(buyer.first_purchase)}</p>
                        <p className={styles.statLabel}>პირველი ყიდვა</p>
                    </div>
                </div>
            </div>
        </Section>
    )
}