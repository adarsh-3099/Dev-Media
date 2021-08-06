import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function SelectList({ name, value, error, info, onChange, options }) {

    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ))

    return (
        <div className="form-group">
            <select value={value} onChange={onChange}  
            className={classnames("form-control form-control-lg",{'is-invalid': error})}
              name={name}>
                  {selectOptions}
              </select>
            { info && <small className="form-text text-muted">{info}</small> }
            { error && (<div className="invalid-feedback">{error}</ div>) }
        </div>
                        
    )
}

SelectList.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}

export default SelectList;
