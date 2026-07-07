import InputText from '@/components/ui/InputText/InputText'

export const FilterBar = ({ search, setSearch }) => {
    return (
        <div className='row'>
            <div className='col-4'>
                <InputText
                    title="ძებნა"
                    type="text"
                    value={search}
                    placeholder="სახელი, პ/ნ, ელ-ფოსტა..."
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
        </div>
    )
}
