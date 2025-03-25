import express from "express";
import { getBookingById ,newBooking, deleteBooking } from "../controllers/booking-controllers.js?";


const bookingsRouter = express.Router();

bookingsRouter.get("/:id",getBookingById)
bookingsRouter.post('/',newBooking)
bookingsRouter.delete("/:id", deleteBooking)



export default bookingsRouter;
