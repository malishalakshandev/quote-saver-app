class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype); // ✅ Fix for instanceof
        this.name = "BadRequestError";
    }
}

export default BadRequestError;