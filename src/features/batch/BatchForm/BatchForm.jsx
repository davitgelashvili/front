import Form from './Form'

export default function BatchForm({ attr }) {

    return (
        <div className='container-fluid box'>
            <h1>{attr.title}</h1>
            <Form attr={{
                values: attr?.values,
                setValues: attr?.setValues,
                handleSubmit: attr?.handleSubmit
            }} />
        </div>
    )
}