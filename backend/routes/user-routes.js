import express from "express"
import   {getAllUsers, signup, updateUser, deleteUser, login, getBookingOfUser } from "../controllers/user-controllers.js";






const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post('/signup',signup);
userRouter.put('/:id', updateUser);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login", login);
userRouter.get("/booking/:id", getBookingOfUser);



export default userRouter;
