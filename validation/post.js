const Validator = require('validator')
const isEmpty = require('./is_empty')


module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : ''

    if(!Validator.isLength(data.text,{ min: 3, max: 400 })){
        errors.text = 'Field must be between 3-400 character'
    }

    if(Validator.isEmpty(data.text)){
        errors.text = 'Text field is Required'
    }    

    return { errors, isValid: isEmpty(errors) };
}