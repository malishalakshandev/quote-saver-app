import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./infrastructure/db";

import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import { clerkMiddleware } from "@clerk/express";
import quoteRouter from "./api/quote";
import userRouter from "./api/user";

const app = express();

app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: "http://localhost:5173" }));


// app.use((req, res, next) => {
//     console.log('req.body:', req.body);
//     console.log('req.method:', req.method);
//     console.log('req.url:', req.url);
//     console.log('req.originalUrl:', req.originalUrl);
//     console.log('req.query:', req.query);
//     console.log('req.params:', req.params);
//     console.log('req.headers:', req.headers);

//     next();
// });

// api routers
app.use('/api/quotes', quoteRouter);
app.use('/api/users', userRouter);

// error handling middleware
app.use(globalErrorHandlingMiddleware);

// connect database
connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});