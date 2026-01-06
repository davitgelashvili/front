import React, { useEffect, useState } from 'react'
import InputText from '../../../components/ui/InputText'

export default function Form({ attr }) {
    const [formCount, setFormCount] = useState(1)

    function handleChange(e, dayIndex, tierIndex, name) {
        const value = e.target.value

        attr.setValues(prev => {
            const updated = [...prev]

            if (tierIndex === undefined) {
                // დღეების-level ცვლილება
                updated[dayIndex] = {
                    ...updated[dayIndex],
                    [name]: value
                }
            } else {
                // კალათის-level ცვლილება
                const tiers = [...updated[dayIndex].tiers]
                tiers[tierIndex] = {
                    ...tiers[tierIndex],
                    [name]: Number(value)
                }
                updated[dayIndex] = {
                    ...updated[dayIndex],
                    tiers
                }
            }

            return updated
        })
    }


    useEffect(() => {
        console.log(attr.values)
    }, [attr.values])

    return (
        <div>
            <button onClick={attr.addForm}>დღის დამატება</button>
            <form onSubmit={attr.handleSubmit}>
                {attr?.values?.map((input, index) => {
                    return (
                        <div className='box' style={{ padding: '0 20px' }} key={input.date}>
                            <InputText
                                title={'სახელი'}
                                type={'text'}
                                name={'name'}
                                value={input.name}
                                placeholder={'შეიყვანეთ ტექსტი'}
                                onChange={(e) => handleChange(e, index, undefined, 'name')}
                            />
                            <InputText
                                title={'თარიღი'}
                                type={'date'}
                                name={'date'}
                                value={input.date}
                                placeholder={'შეიყვანეთ ტექსტი'}
                                onChange={(e) => handleChange(e, index, undefined, 'date')}
                            />
                            <div>
                                <h4 onClick={() => attr.addTier(index)}>კალათის დამატება</h4>
                            </div>
                            {input?.tiers?.map((_input, tierIndex) => {
                                return (
                                    <div className='box' style={{ padding: '0 20px' }} key={tierIndex}>
                                        <InputText
                                            title={'ბილეთების რაოდენობა'}
                                            type={'text'}
                                            name={'capacity'}
                                            value={_input.capacity}
                                            placeholder={'შეიყვანეთ ტექსტი'}
                                            onChange={(e) => handleChange(e, index, tierIndex, 'capacity')}
                                        />
                                        <InputText
                                            title={'ფასი'}
                                            type={'text'}
                                            name={'price_cents'}
                                            value={_input.price_cents}
                                            placeholder={'შეიყვანეთ ტექსტი'}
                                            onChange={(e) => handleChange(e, index, tierIndex, 'price_cents')}
                                        />
                                        <InputText
                                            title={'კალათის ნომერი'}
                                            type={'text'}
                                            name={'tier_no'}
                                            value={_input.tier_no}
                                            placeholder={'შეიყვანეთ ტექსტი'}
                                            onChange={(e) => handleChange(e, index, tierIndex, 'tier_no')}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                <button>შენახვა</button>
            </form>
        </div>
    )
}
