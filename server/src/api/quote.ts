import express from "express";
import { adminDeleteQuote, adminGetQuotesByUserId, adminToggleQuoteStatus, adminUpdateQuote, createQuote, deleteQuoteById, getPublicQuotes, getQuoteById, getQuotesByUserId, updateQuoteById } from "../application/quote";
import isAuthenticated from "./middleware/authentication-middleware";

const quoteRouter = express.Router();

   

/* ======= Define static routes before dynamic routes like :id ======== */
/* ======= Public Routes (Auth Not Required) ======== */
quoteRouter
    .route("/public")
    .get(getPublicQuotes); // get quotes where isPublic === true and isActive === true

/* ======= General User Routes (Auth Required) ======== */
quoteRouter
    .route("/")
    .get(isAuthenticated, getQuotesByUserId) // get own quotes
    .post(isAuthenticated, createQuote); // create own quotes

quoteRouter
    .route("/:id")
    .get(isAuthenticated, getQuoteById) // get single own quote by quote id
    .put(isAuthenticated, updateQuoteById) // update own quote (quote_name and isPublic) by quote id
    .delete(isAuthenticated, deleteQuoteById); // delete own quote by quote id


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