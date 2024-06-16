const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['user', 'admin'],
        default: 'user'
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { 
            _id: this._id, 
            status: this.status, 
            name: this.firstName + " " + this.lastName 
        }, 
        process.env.JWTPRIVATEKEY, 
        {
            expiresIn: "7d",
        }
    );
    return token;
}

const User = mongoose.model("User", userSchema);

const validateRegisterData = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(30).required().messages({
            'any.required': 'Pole Imię jest wymagane!',
            'string.min': 'Imię powinno mieć co najmniej {#limit} znaki!',
            'string.max': 'Imię powinno mieć maksymalnie {#limit} znaków!'
        }),
        lastName: Joi.string().min(2).max(30).required().messages({
            'any.required': 'Pole Nazwisko jest wymagane!',
            'string.min': 'Nazwisko powinno mieć co najmniej {#limit} znaki!',
            'string.max': 'Nazwisko powinno mieć maksymalnie {#limit} znaków!'
        }),
        email: Joi.string().email().required().messages({
            'any.required': 'Pole Email jest wymagane!',
            'string.email': 'Podaj adres email w poprawnej formie!'
        }),
        password: passwordComplexity().required().messages({
            'any.required': 'Pole Hasło jest wymagane!',
            'any.required': 'Pole Hasło jest wymagane!'
        }),
    });

    return schema.validate(data);
};

const validateLoginData = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'any.required': 'Pole Email jest wymagane!',
            'string.email': 'Podaj adres email w poprawnej formie!'
        }),
        password: Joi.string().required().messages({
            'any.required': 'Pole Hasło jest wymagane!'
        }),
    });

    return schema.validate(data);
};


const validateProfileChangeData = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(30).allow('').label("Imię").messages({
            'string.min': 'Pole Imię powinno mieć co najmniej {#limit} znaki!',
            'string.max': 'Polę Imię powinno mieć maksymalnie {#limit} znaków!'
        }),
        lastName: Joi.string().min(2).max(30).allow('').label("Nazwisko").messages({
            'string.min': 'Pole powinno mieć co najmniej {#limit} znaki!',
            'string.max': 'Nazwisko powinno mieć maksymalnie {#limit} znaków!'
        }),
        email: Joi.string().email().allow('').label("Email").messages({
            'string.email': 'Podaj adres email w poprawnej formie!'
        }),
    });
    console.log("xD");

    return schema.validate(data);
};

const validatePasswordChangeData = (data) => {
    const schema = Joi.object({
        currentPassword: Joi.string().required().label("Aktualne hasło").messages({
            'any.required': 'Pole Aktualne hasło jest wymagane!',
        }),
        newPassword: passwordComplexity().required().label("Nowe hasło").messages({
            'any.required': 'Pole Nowe hasło jest wymagane!',
        }),
        confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).required().label("Potwierdzenie nowego hasła").messages({
            "any.only": "Pole Potwierdź nowe hasło musi być zgodne z nowym hasłem!",
            'any.required': 'Pole Potwierdź nowe hasło jest wymagane!',
        }),
    });


    return schema.validate(data);
};

module.exports = { User, validateRegisterData, validateLoginData, validateProfileChangeData, validatePasswordChangeData };

