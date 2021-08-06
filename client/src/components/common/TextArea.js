import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function TextArea({ name, placeholder, value, error, info, onChange }) {
    return (
        <div className="form-group">
            <textarea value={value} onChange={onChange}  
            className={classnames("form-control form-control-lg",{'is-invalid': error})}
             placeholder={placeholder} name={name} />
            { info && <small className="form-text text-muted">{info}</small> }
            { error && (<div className="invalid-feedback">{error}</ div>) }
        </div>
                        
    )
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default TextArea;
