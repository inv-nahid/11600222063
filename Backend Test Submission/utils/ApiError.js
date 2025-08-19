class ApiError extends Error{
    constructor(httpStatusCode, errorMessage="An unexpected error occurred during operation", validationErrors=[], stackTrace=""){
        super(errorMessage);
        this.statusCode = httpStatusCode;
        this.data = null;
        this.message = errorMessage;
        this.success = false;
        this.errors = validationErrors;

        if(stackTrace){
            this.stack=stackTrace;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};