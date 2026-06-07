import Form from './Form'

export default function HudForm({ attr }) {

    return (
        <div className='container box'>
            <div className=''>
                <h1>{attr.title}</h1>
                <Form attr={{
                    values: attr?.values,
                    setValues: attr?.setValues,
                    handleSubmit: attr?.handleSubmit,
                    loading: attr?.loading,
                    error: attr?.error,
                }} />
            </div>
        </div>
    )
}
