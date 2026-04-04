import React, { useState } from 'react'
import InputText from '../../../components/ui/InputText'

export default function Form({ attr }) {
    const inputData = [
        {
            title: 'სახელი',
            type: 'text',
            name: 'name',
            value: attr.values.name,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'ფასი',
            type: 'text',
            name: 'price',
            value: attr.values.price,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'რაოდენობა',
            type: 'text',
            name: 'capacity',
            value: attr.values.capacity,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr.setValues({ ...attr.values, [e.target.name]: e.target.value }),
        },
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