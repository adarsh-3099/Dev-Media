const Validator = require('validator')
const isEmpty = require('./is_empty')


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    // runs if not in email exists but not in format
    if (!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    // runs if password exists but not in proper format
    if (
        !Validator.isEmpty(data.password) &&
        !Validator.isLength(data.password, { min: 6, max: 30 })
    ) {
        errors.password = "Password must be at least 6 chracters";
    }


    return { errors, isValid: isEmpty(errors) };

}