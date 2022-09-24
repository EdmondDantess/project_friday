import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import  './superSelect.css'


type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    value: string
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {value,
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] = options ? options.map((el, index) => {
        return (
            <option key={index} value={el}>{el}</option>
        )
    }) : []; // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // onChange, onChangeOption
        if (onChangeOption)
            onChangeOption(e.currentTarget.value)
    }

    return (
        <select
            className='SelectOption'
            onChange={onChangeCallback}
            value={value}
            {...restProps}
        >
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
