class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
        this.stack = Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
