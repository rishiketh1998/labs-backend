const express = require('express')
const statusCodes = require('../helpers/statusCode.js')
const fs = require("fs")
const router = express.Router()

/**
 * @author Rishi
 * @description: reverse's an array
 * @param arr
 * @returns {[]}
 */
const reverseArr = arr => {
    const data = []
    for(let i = arr.length - 1; i >= 0; i--) {
        data.push(arr[i])
    }
    return data
}

/**
 * @author Rishi
 * @description: retrieves all the users inquiries in latest order by reading all the files.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllInquiries = async (req, res) => {
    try {
        const files = fs.readdirSync('inquiries')
        const data = files.map(file => JSON.parse(fs.readFileSync(`inquiries/${file}`, "utf-8")))
        if(data.length === 0) res.status(statusCodes['OK']).json({"Data": "There are no inquiries yet."})
        else {
            let sortedData = reverseArr(data)
            res.status(statusCodes['OK']).json({"Data": sortedData})
        }
    } catch (e) {
        res.status(statusCodes['INTERNAL SERVER ERROR']).json({"Error": "Internal server error please try again in sometime."})
    }
}

router.get('/', getAllInquiries)
module.exports = router;