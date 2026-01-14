import AddButton from '../components/ui/AddButton'
import BatchList from '../features/batch/list/List'

export const BatchPage = () => {
    return (
        <>
            <BatchList />
            <AddButton text={'Add Batch'} url={'add'} />
        </>
    )
}
