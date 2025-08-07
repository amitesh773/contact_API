const joi = require('joi')

const userValiddation = joi.object({
    name: joi.string().required().min(3),
    surname: joi.string().required().min(3),
    email: joi.string().email(),
    phone: joi.number().required().min(10)
})

module.exports = userValiddation;