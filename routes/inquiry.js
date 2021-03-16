const express = require('express')
const { inquiryFormSchema } = require('../json_schemas/inquiry.js')
const statusCodes = require('../helpers/statusCode.js')
const fs = require("fs")
const router = express.Router()

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
    if(error) res.status(statusCodes['FORBIDDEN']).json({"Error": error.message})
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
    const text = `Name: ${name}\nEmail: ${email}\nSubscription: ${subscription}\nMessage: ${message}\n`
    fs.writeFile(`inquires/${fileName}`, text, err => {
        if(err) res.status(statusCodes['INTERNAL SERVER ERROR']).json({"Error": "Internal server error please try again in sometime."})
        res.status(statusCodes['CREATED']).json({ "Message": "Inquiry successfully submitted." })
    });
}

router.post('/', validateData, createInquiry)
module.exports = router;