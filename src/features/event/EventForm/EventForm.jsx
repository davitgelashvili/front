import { Section } from '@/components/Section/Section'
import Form from './Form'

export default function EventForm({ attr }) {

    return (
        <div className='container-fluid'>
            <Section title={attr.title}>
                <div className='box'>
                    <Form attr={{
                        values: attr?.values,
                        setValues: attr?.setValues,
                        handleSubmit: attr?.handleSubmit,
                        loading: attr?.loading,
                        error: attr?.error,
                    }} />
                </div>
            </Section>
        </div>
    )
}
