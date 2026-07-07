import InputText from '@/components/ui/InputText/InputText'
import CustomButton from '@/components/ui/CustomButton/CustomButton'
import styles from './styles.module.scss'

export const FilterBar = ({ search, setSearch, userRole }) => {
    return (
        <div className={`${styles.filterBar} d-flex align-items-center justify-content-between`}>
            <InputText
                type="text"
                value={search}
                placeholder="სახელით ძებნა..."
                onChange={e => setSearch(e.target.value)}
            />
        </div>
    )
}
