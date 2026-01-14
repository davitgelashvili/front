import AddButton from '../components/ui/AddButton'
import EventList from '../features/event/list/List'

export default function HudDetailPage() {
    return (
        <>
            <EventList />
            <AddButton url={'add'} text={'Add Day'} />
        </>
    )
}
