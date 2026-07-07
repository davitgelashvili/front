import ListItemCard from '@/components/ui/ListItemCard/ListItemCard';

export default function List({ items, onDelete }) {
    return (
        <div className="row">
            {items.map(item => (
                <div className="col-4" key={item.id}>
                    <ListItemCard
                        cover={item.cover}
                        title={item.title}
                        description={item.description}
                        date={{ start: item.start_datetime, end: item.end_datetime }}
                        status={item.status}
                        stats={[
                            { label: 'Days', value: item.event_count },
                            { label: 'Batches', value: item.batch_count },
                        ]}
                        actions={[
                            { label: 'Add Day', url: `${item.id}/add`, style: 'light' },
                            { label: 'Manage', url: String(item.id), style: 'dark' },
                        ]}
                        onDelete={() => onDelete(item.id)}
                    />
                </div>
            ))}
        </div>
    )
}