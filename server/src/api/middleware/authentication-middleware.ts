import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import UnauthorizedError from "../../domain/errors/unauthorized-error";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
 
    const auth = getAuth(req);
    if(!auth || !auth.userId){
        throw new UnauthorizedError("Unauthorized");
    }
    next();

}

export default isAuthenticated;