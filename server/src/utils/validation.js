
import validator from "validator";

export function validateUserData(data) {
    const errors = {};

    const {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        gender,
        skillsKnown = [],
        skillsWantToLearn = []
    } = data;

    if (!firstName || firstName.trim() === "") {
        errors.firstName = "First name is required";
    }
    if (!lastName || lastName.trim() === "") {
        errors.lastName = "Last name is required";
    }
    if (!email) {
        errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
        errors.email = "Invalid email format";
    }
    if (!password) {
        errors.password = "Password is required";
    } else if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minSymbols: 1 })) {
        errors.password = "Password must be at least 8 characters long and include a number & symbol";
    }
    if (!dateOfBirth || !validator.isDate(dateOfBirth)) {
        errors.dateOfBirth = "Valid date of birth is required";
    }
    if (!gender || !["male", "female", "other"].includes(gender.toLowerCase())) {
        errors.gender = "Gender must be male, female, or other";
    }

    if (Array.isArray(skillsKnown)) {
        for (let skill of skillsKnown) {
            if (!validator.isLength(skill, { min: 2, max: 30 })) {
                errors.skillsKnown = `Invalid skill: ${skill}`;
                break;
            }
        }
    }

    if (Array.isArray(skillsWantToLearn)) {
        for (let skill of skillsWantToLearn) {
            if (!validator.isLength(skill, { min: 2, max: 30 })) {
                errors.skillsWantToLearn = `Invalid skill: ${skill}`;
                break;
            }
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
