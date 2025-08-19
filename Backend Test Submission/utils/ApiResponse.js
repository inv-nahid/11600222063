class ApiResponse{
    constructor(httpStatusCode, responseData, responseMessage = "Operation completed successfully"){
        this.statusCode = httpStatusCode;
        this.data = responseData;
        this.message = responseMessage;
        this.success = httpStatusCode < 400;
    }
}

export {ApiResponse};