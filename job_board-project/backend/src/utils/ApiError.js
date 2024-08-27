export default class ApiError extends Error {
    constructor(
        statusCode, 
        errors = [],
        massage = "Throw Error Messages",
        
    ){
        this.statusCode = statusCode
        this.message = this.message
        this.errors = errors
        this.success = false
        
        
    }
}