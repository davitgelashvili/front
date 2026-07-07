import ListItemCard from '@/components/ui/ListItemCard/ListItemCard'

export const List = ({ users, onDelete }) => {
    return (
        <div className="row">
            {users.map(user => {
                const initials = user.fullname
                    .split(' ')
                    .map(w => w[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)

                return (
                    <div className="col-4" key={user.user_id}>
                        <ListItemCard
                            avatar={initials}
                            title={user.fullname}
                            description={user.email}
                            stats={[
                                { label: 'Events', value: user.hud_count },
                                { label: 'Days', value: user.event_count },
                                { label: 'Batches', value: user.ticket_count },
                            ]}
                            actions={[
                                { label: 'Edit', url: `/clients/${user.user_id}/edit`, style: 'light' },
                                { label: 'Manage', url: `/clients/${user.user_id}`, style: 'dark' },
                            ]}
                            onDelete={() => onDelete(user.user_id)}
                        />
                    </div>
                )
            })}
        </div>
    )
}