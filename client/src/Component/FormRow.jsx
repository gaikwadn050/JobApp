import React from 'react'

const FormRow = ({ type, name, labelText, placeholder, defaultValue, onChange }) => {
  return (
    <div>
      <div className="form-row">
        <label htmlFor="name" className='form-label' >
          {name || labelText}
        </label>
        <input type={type}
          id={name}
          name={name}
          className='form-input'
          placeholder={placeholder || ""}
          defaultValue={defaultValue || ""}
          onChange={onChange}
          required />
      </div>
    </div>
  )
}

export default FormRow
