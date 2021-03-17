const express = require('express')
const { inquiryFormSchema } = require('../json_schemas/inquiry.js')
const statusCodes = require('../helpers/statusCode.js')
const fs = require("fs")
const router = express.Router()
const request = require('request')

/**
 * @author Rishi
 * @description: upper cases the first letter of the error message
 * @param message
 * @returns {string}
 */
const capitalize = (message) => message[1].toUpperCase() + message.slice(2);

/**
 * @author Rishi
 * @description: validates whether the user has successfully selected the recaptcha by making an ajax call to google api.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const validateRecaptcha = async (req, res, next) => {
    if(req.body.captcha == null || req.body.captcha === '') {
        res.status(statusCodes['FORBIDDEN']).json({"Error": `Please select captcha`})
    }
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}
    &response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body)
        if(body.success) next()
        else res.status(statusCodes['FORBIDDEN']).json({"Error": `Please select captcha`})
    })
}

/**
 * @author Rishi
 * @description: validates the data entered by the user to verify all the information is valid
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const validateData = async (req, res, next) => {
    const { error } = await inquiryFormSchema.validate(req.body)
    if(error) res.status(statusCodes['FORBIDDEN']).json({"Error": `"${capitalize(error.message)}`})
    else next()
}

/**
 * @auhtor Rishi
 * @description: creates an inquiry posted by the user and saves it in a file, the name of this file is the
 * current time the inquiry is made in ms.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const createInquiry = async (req, res) => {
    const { name, email, message,  subscription } = req.body
    const fileName = new Date().getTime() + '.txt'
    const date = (new Date()).toString()
    const text = `{ "Name": "${name}", "Email": "${email}", "Subscription": "${subscription}", "Message": "${message}", "Date": "${date}" }`
    fs.writeFile(`inquiries/${fileName}`, text, err => {
        if(err) res.status(statusCodes['INTERNAL SERVER ERROR']).json({"Error": "Internal server error please try again in sometime."})
        res.status(statusCodes['CREATED']).json({ "Message": "Inquiry successfully submitted." })
    });
}

router.post('/', validateRecaptcha,validateData, createInquiry)
module.exports = router;