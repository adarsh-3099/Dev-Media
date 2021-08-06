import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function InputGroup({ name, placeholder, value, error, onChange, icon, type }) {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepand">
            </div>
            <input value={value} onChange={onChange} type={type}
            className={classnames("form-control form-control-lg",{'is-invalid': error})}
             placeholder={placeholder} name={name} />
            { error && (<div className="invalid-feedback">{error}</ div>) }
        </div>
                        
    )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;
