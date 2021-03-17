## Inquiry Form

Collects user inquiry and saves it in a file locally 

URL: `/v1/inquiry`

Method: `POST`

URL Params: `None`

Data Params:
```javascript
{   
    name: [string, required],
    email: [string, required],
    message: [string, required], 
    subscription: [boolean, required],
    captcha: [string, required]
}
```

Data Example:
```javascript
{ 
    name: "Noel" 
    email: "omen@gmail.com", 
    message: "Really nice treats",
    subscription: true,
    captcha: "321%6d8s" //must match     
}
```

### Success Response

Code: `201 CREATED`

Content Example:
```javascript
  {
      "Message": "Inquiry successfully submitted",
  }  
```

### Failure Response

Code: `403 Forbidden || 500 Internal Server Error`

Content Example:
 ```javascript
 {"Error": `Please select captcha`} ||
 {"Error": '"Name" entered is not valid'} || 
 {"Error": "Internal server error, Please try again in sometime."}
 ```