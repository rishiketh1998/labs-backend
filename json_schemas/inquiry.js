const Joi = require('joi')

/**
 * @author Rishi
 * @description: schema validates the inquiry form details entered by the user by using joi library.
 * @type {Joi.ObjectSchema<any>}
 */
const inquiryFormSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'uk']}}).max(256).required(),
    message: Joi.string().required(),
    subscription: Joi.boolean().required()
})

module.exports = {
    inquiryFormSchema
}