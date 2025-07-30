import express from "express";
import { adminDeleteQuote, adminGetQuotesByUserId, adminToggleQuoteStatus, adminUpdateQuote, createQuote, deleteQuoteById, getPublicQuotes, getQuoteById, getQuotesByUserId, updateQuoteById } from "../application/quote";

const quoteRouter = express.Router();

/* ======= General User Routes (Auth Required) ======== */
quoteRouter
    .route("/")
    .get(getQuotesByUserId) // get own quotes
    .post(createQuote); // create own quotes

quoteRouter
    .route("/:id")
    .get(getQuoteById) // get single own quote by quote id
    .put(updateQuoteById) // update own quote (quote_name and isPublic) by quote id
    .delete(deleteQuoteById); // delete own quote by quote id

    
/* ======= Public Routes (Auth Not Required) ======== */
quoteRouter
    .route("/public")
    .get(getPublicQuotes); // get quotes where isPublic === true and isActive === true


/* ======= Admin Routes (Admin Only / Auth Required) ======== */
quoteRouter
    .route("/admin/user/:userId")
    .get(adminGetQuotesByUserId); // get all quotes by userId
    
quoteRouter
    .route("/admin/quote/:quoteId")
    .put(adminUpdateQuote) // admin update own and other users quote
    .delete(adminDeleteQuote) // admin delete own and other users quote

quoteRouter
    .route("/admin/quote/:quoteId/toggle")
    .patch(adminToggleQuoteStatus)

// quoteRouter
//     .route("/admin")
//     .get(adminGetAllQuote); // admin get all users quotes
//     .post(adminCreateQuote); // admin create own and other users quotes

export default quoteRouter;