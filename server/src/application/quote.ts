import { Request, Response, NextFunction } from "express";
import Quote from "../infrastructure/db/entities/Quote";
import { createQuoteDTO, updateQuoteDTO } from "../domain/dto/quote";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import mongoose from "mongoose";
import BadRequestError from "../domain/errors/bad-request-error";

import { getAuth } from "@clerk/express";
import { users } from "@clerk/clerk-sdk-node";
import UnauthorizedError from "../domain/errors/unauthorized-error";

const getQuotesByUserId = async (req: Request, res: Response, next: NextFunction) => {
    
    try {

        const { userId } = getAuth(req);
        const quotes = await Quote.find({ userId });
        res.status(200).json(quotes);
        
    } catch (error) {
        next(error);   
    }
}

const getQuoteById = async (req: Request, res: Response, next: NextFunction) => {
    
    try {

        const { userId } = getAuth(req);
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestError("Invalid quote id");
        }

        const quote = await Quote.findOne({ userId, _id: id });

        if(!quote){
            throw new NotFoundError("Quote not found");
        }

        res.status(200).json(quote);
        
    } catch (error) {
        next(error);   
    }
}

const createQuote = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { userId } = getAuth(req);

        if (!userId) {
            throw new UnauthorizedError("Unauthorized");
        }

        const clerkUser = await users.getUser(userId); // Fetch full user from Clerk backend
        
        const data =  req.body;

        const dataToValidate = {
            ...req.body,
            user: {
                userId,
                first_name: clerkUser.firstName || "",
                last_name: clerkUser.lastName || "",
            },
        };

        const parsedDataresult = createQuoteDTO.safeParse(dataToValidate);

        if(!parsedDataresult.success){
            throw new ValidationError("Server Validation Error");
        }

        await Quote.create({
            user: parsedDataresult.data.user,
            quote_name: parsedDataresult.data.quote_name,
            isPublic: parsedDataresult.data.isPublic
        });

        res.status(201).send({ message: "Quote created successfully" });

    } catch (error) {
        next(error);
    }

}

const updateQuoteById = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { id } = req.params;

        const parsedDataresult = updateQuoteDTO.safeParse({
            ...req.body
        });

        if(!parsedDataresult.success){
            throw new ValidationError("Server Validation Error");
        }

        const quote = await Quote.findByIdAndUpdate(id, {quote_name: req.body.quote_name, isPublic: req.body.isPublic }, {new: true});
        
        if (!quote) {
            throw new NotFoundError("Quote not found");
        }
       
        res.status(200).json({ message: "Quote updated successfully" });

    } catch (error) {
        next(error);
    }

}

const deleteQuoteById = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const { id } = req.params
        const quote = await Quote.findByIdAndDelete(id);
        if(!quote){
            throw new NotFoundError("Quote not found");
        }
        res.status(200).json({ message: "Quote deleted successfully" });

    } catch (error) {
        next(error);
    }
}

const getPublicQuotes = async (req: Request, res: Response, next: NextFunction) => {
    
    try {

        const quotes = await Quote.find({ isPublic: true, isActive: true });
        res.status(200).json(quotes);
        
    } catch (error) {
        next(error);   
    }
}

const adminGetQuotesByUserId = async (req: Request, res: Response, next: NextFunction) => {
    
    try {

        const { userId } = req.params;
        const quotes = await Quote.find({ userId });
        res.status(200).json(quotes);
    
    } catch (error) {
        next(error);   
    }
}

const adminUpdateQuote = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { quoteId } = req.params;

        const parsedDataresult = updateQuoteDTO.safeParse({
            ...req.body
        });

        if(!parsedDataresult.success){
            throw new ValidationError("Server Validation Error");
        }

        const quote = await Quote.findByIdAndUpdate(quoteId, {quote_name: req.body.quote_name, isPublic: req.body.isPublic }, {new: true});
        if (!quote) {
            throw new NotFoundError("Quote not found");
        }

        res.status(200).json({ message: "Quote updated successfully" });

    } catch (error) {
        next(error);
    }

}

const adminDeleteQuote = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const { quoteId } = req.params
        const quote = await Quote.findByIdAndDelete(quoteId);

        if(!quote){
            throw new NotFoundError("Quote not found");
        }
        res.status(200).json({ message: "Quote deleted successfully" });

    } catch (error) {
        next(error);
    }
}

const adminToggleQuoteStatus = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { quoteId } = req.params;
        
        const quote = await Quote.findById(quoteId); // findById --> return one document
        
        if(!quote){
            throw new NotFoundError("Invalid. Quote not found");
        }

        quote.isActive = !quote.isActive;
        await quote.save();
        res.status(200).json(quote);
        
    } catch (error) {
        next(error);
    }

}


export { 
        getQuotesByUserId,
        getQuoteById,
        createQuote,
        updateQuoteById,
        deleteQuoteById,
        getPublicQuotes,
        adminGetQuotesByUserId,
        adminUpdateQuote,
        adminDeleteQuote,
        adminToggleQuoteStatus
}