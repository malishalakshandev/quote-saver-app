import { Request, Response, NextFunction } from "express";
import { users } from "@clerk/clerk-sdk-node";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    
    try {

        const result = await users.getUserList({ limit: 100 }); // default is page 1    
        
        const filteredUsers = result.map((user) => ({
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
        }));

        res.status(200).json(filteredUsers); // send only user data array
        
    } catch (error) {
        next(error);   
    }
}

export { getAllUsers }