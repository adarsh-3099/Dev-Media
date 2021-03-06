const Validator = require('validator')
const isEmpty = require('./is_empty')


module.exports = function validateExperinceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : ''
    data.company = !isEmpty(data.company) ? data.company : ''
    data.from = !isEmpty(data.from) ? data.from : ''

    if(Validator.isEmpty(data.title)){
        errors.title = 'Job title is Required'
    }    

    if(Validator.isEmpty(data.company)){
        errors.company = 'Company Field is Required'
    }

    if(Validator.isEmpty(data.from)){
        errors.from = 'From Date Field is Required'
    }

    return { errors, isValid: isEmpty(errors) };

}