import { Section } from '@/components/Section/Section'
import Form from './Form'

export default function HudForm({ attr }) {

    return (
        <div className='container'>
            <Section
                title={attr.title}>
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
