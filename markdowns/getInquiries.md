## Get all Inquiries

Retrieves all the inquiries that is currently stored locally with the newest showing first

URL: `/v1/inquiries`

Method: `GET`

URL Params: `None`

Data Params: `None`

Data Example: `None`

### Success Response

Code: `200 OK`

Content Example:
```javascript
{
    {
        "Data": [
        {
            "Name": "Rishi",
            "Email": "skye@gmail.com",
            "Subscription": "true",
            "Message": "Awseomese like the treats",
            "Date": "Wed Mar 17 2021 09:43:41 GMT+0000 (Greenwich Mean Time)"
        },
        {
            "Name": "Rishi",
            "Email": "skye@gmail.com",
            "Subscription": "true",
            "Message": "Awseomese like the treats",
            "Date": "Wed Mar 17 2021 09:42:33 GMT+0000 (Greenwich Mean Time)"
        }
    ]
    }
}
```

### Failure Response

Code: `500 Internal Server Error`

Content Example:
 ```javascript
 {"Error": "Internal server error, Please try again in sometime."}
 ```
               