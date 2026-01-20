import React, { useState } from 'react'
import InputText from '../../../components/ui/InputText'

export default function Form({ attr }) {
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
            title: 'დასაწყისი',
            type: 'date',
            name: 'start_datetime',
            value: attr.values.start_datetime,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'დამთავრება',
            type: 'date',
            name: 'end_datetime',
            value: attr.values.end_datetime,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'მინ. ფასი',
            type: 'text',
            name: 'min_price',
            value: attr.values.min_price,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'მაქს. ფასი',
            type: 'text',
            name: 'max_price',
            value: attr.values.max_price,
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
