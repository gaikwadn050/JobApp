import React from 'react'

const FormRow = ({type,name,labelText, placeholder}) => {
  return (
    <div>
    <div className="form-row">
    <label htmlFor="name" className='form-label' >
     { name ||labelText}
    </label>
    <input type={type}
     id={name}
     name={name}
     className='form-input'
      placeholder={placeholder || ""}
      required/>
  </div>
    </div>
  )
}

export default FormRow
