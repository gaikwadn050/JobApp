import React from 'react'

const FormRowSelect = ({ name, labelText, list, defaultValue, onChange }) => {
    return (
        <div>
            <div className="form-row">
                <label htmlFor={name} className='form-label' >
                    {labelText || name}
                </label>
                <select
                    id={name}
                    name={name}
                    className='form-select'
                    defaultValue={defaultValue || ""}
                    onChange={onChange}
                    required >
                    {list.map((item) => {
                        return <option key={item} value={item}> {item}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default FormRowSelect
