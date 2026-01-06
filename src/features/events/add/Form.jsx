import React, { useState } from 'react'
import InputText from '../../../components/ui/InputText'

export default function Form({attr}) {
    const inputData = [
        {
            title: 'სახელი',
            type: 'text',
            name: 'title',
            value: attr.values.title,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'აღწერა',
            type: 'textarea',
            name: 'description',
            value: attr.values.description,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'ლოკაცია',
            type: 'text',
            name: 'location',
            value: attr.values.location,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'დასაწყისი',
            type: 'date',
            name: 'startAt',
            value: attr.values.startAt,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'დამთავრება',
            type: 'date',
            name: 'endAt',
            value: attr.values.endAt,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'სურათი',
            type: 'text',
            name: 'cover',
            value: attr.values.cover,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'სტატუსი',
            type: 'select',
            name: 'status',
            value: attr.values.status,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        }
    ]

    return (
        <form onSubmit={attr.handleSubmit}>
            {inputData?.map((input) => {
                return (
                    <InputText
                        key={input.name}
                        title={input.title}
                        type={input.type}
                        name={input.name}
                        value={input.value}
                        placeholder={input.placeholder}
                        onChange={input.onChange}
                    />
                )
            })}
            <button>დამატება</button>
        </form>
    )
}
