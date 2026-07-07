import InputText from '@/components/ui/InputText/InputText'
import ExportButton from '@/components/ui/ExportButton'
import styles from './styles.module.scss'

export const FilterBar = ({
    search, setSearch,
    fromDate, setFromDate,
    toDate, setToDate,
    isAdmin, selectedCount, bulkLoading, onBulkCancel, onExport,
}) => {
    return (
        <div className={styles.filterBar}>
            <div className='row'>
                <div className='col-4'>
                    <InputText
                        type="text"
                        value={search}
                        title="საკვანძო სიტყვა"
                        placeholder="ID, HUD, კლიენტი..."
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className='col-4'>
                    <InputText
                        type="date"
                        name="from_date"
                        title="დასაწყისი თარიღი"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                    />
                </div>
                <div className='col-4'>
                    <InputText
                        type="date"
                        name="to_date"
                        title="საბოლოო თარიღი"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.filterActions}>
                {isAdmin && selectedCount > 0 && (
                    <button
                        className={`${styles.filterBtn} ${styles.filterBtnCancel}`}
                        onClick={onBulkCancel}
                        disabled={bulkLoading}
                    >
                        {bulkLoading ? '...' : `გაუქმება (${selectedCount})`}
                    </button>
                )}
                {isAdmin && <ExportButton onClick={onExport} />}
            </div>
        </div>
    )
}
