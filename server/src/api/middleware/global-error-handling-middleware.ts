import { Request, Response, NextFunction } from "express";
import ValidationError from "../../domain/errors/validation-error";
import NotFoundError from "../../domain/errors/not-found-error";
import UnauthorizedError from "../../domain/errors/unauthorized-error";
import BadRequestError from "../../domain/errors/bad-request-error";

const globalErrorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // console.log('err:',err);
    if(err instanceof ValidationError) {
        res.status(400).json({ message: err.message });
    } else if(err instanceof NotFoundError) {
        res.status(404).json({ message: err.message });
    }else if(err instanceof UnauthorizedError){
        res.status(401).json({ message: err.message });
    }else if(err instanceof BadRequestError){
        res.status(400).json({ message: err.message });
    }else {
        res.status(500).json({ message: "Internal server error" });
    }
    
}

export default globalErrorHandlingMiddleware;