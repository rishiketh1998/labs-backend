/**
 * @author Rishi
 * @description: Status code and method
 * @type {{"SERVICE UNAVAILABLE": number, "INTERNAL SERVER ERROR": number, "NOT FOUND": number,
 * "REQUEST TIMEOUT": number, OK: number, "BAD REQUEST": number, FORBIDDEN: number}}
 */
module.exports = {
    "OK": 200,
    "CREATED": 201,
    "BAD REQUEST": 400,
    "UNAUTHORIZED": 401,
    "FORBIDDEN": 403,
    "NOT FOUND": 404,
    "REQUEST TIMEOUT": 408,
    "INTERNAL SERVER ERROR": 500,
    "SERVICE UNAVAILABLE": 503
}