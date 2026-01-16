import React, { useState } from 'react'
import InputText from '../../../components/ui/InputText'

export default function Form({attr}) {
    // console.log(attr)
    const inputData = [
        {
            title: 'სახელი',
            type: 'text',
            name: 'title',
            value: attr?.values.title,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr?.setValues({ ...attr?.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'აღწერა',
            type: 'textarea',
            name: 'description',
            value: attr?.values.description,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr?.setValues({ ...attr?.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'ლინკი',
            type: 'text',
            name: 'slug',
            value: attr?.values.slug,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr?.setValues({ ...attr?.values, [e.target.name]: e.target.value }),
        },
        {
            title: 'სურათი',
            type: 'text',
            name: 'cover',
            value: attr?.values.cover,
            placeholder: 'შეიყვანეთ ინფორამცია',
            onChange: (e) => attr?.setValues({ ...attr?.values, [e.target.name]: e.target.value }),
        }
    ]

    console.log(attr)
    return (
        <form onSubmit={attr?.handleSubmit}>
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
