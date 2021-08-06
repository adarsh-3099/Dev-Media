const Validator = require('validator')
const isEmpty = require('./is_empty')


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : '' 

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = "Name must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

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

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Password 2 is required";
    }

    // runs if not in password 2 exists but not in format
    if (
        !Validator.isEmpty(data.password2) &&
        !Validator.equals(data.password, data.password2)
    ) {
        errors.password2 = "Passwords must match";
    }

    return { errors, isValid: isEmpty(errors) };

}