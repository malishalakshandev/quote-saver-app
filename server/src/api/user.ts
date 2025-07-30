import express from "express";
import { getAllUsers } from "../application/user";


const userRouter = express.Router();

/* ======= Admin Routes (Admin Only / Auth Required) ======== */
userRouter.get("/admin/users", getAllUsers);


export default userRouter;