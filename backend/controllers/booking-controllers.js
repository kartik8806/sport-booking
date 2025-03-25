
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Sport from "../models/Sport.js";
import User from "../models/User.js";

export const newBooking = async (req, res) => {
    // const { sport, date, seatNumber, user } = req.body;
    const { sport, seatNumber, user } = req.body;

    console.log(sport);
    console.log(seatNumber);
    console.log(user);

    


    // try {
    //     if (!sport || !date || !seatNumber || !user) {
    //         return res.status(400).json({ message: "All fields are required" });
    //     }

    //     const validDate = new Date(date);
    //     if (isNaN(validDate)) {
    //         return res.status(400).json({ message: "Invalid date format" });
    //     }

    //     const session = await mongoose.startSession();
    //     session.startTransaction();  // ✅ Ensure transaction is started properly

    //     try {
    //         const [existingSport, existingUser] = await Promise.all([
    //             Sport.findById(sport).session(session),
    //             User.findById(user).session(session),
    //         ]);

    //         if (!existingSport) {
    //             await session.abortTransaction();
    //             session.endSession();
    //             return res.status(404).json({ message: "Sport not found with given ID" });
    //         }

    //         if (!existingUser) {
    //             await session.abortTransaction();
    //             session.endSession();
    //             return res.status(404).json({ message: "User not found with given ID" });
    //         }

    //         // Create booking
    //         const booking = new Booking({ sport, date: validDate, seatNumber, user });

    //         existingUser.booking.push(booking);
    //         existingSport.booking.push(booking);

    //         await Promise.all([
    //             existingUser.save({ session }),
    //             existingSport.save({ session }),
    //             booking.save({ session }),
    //         ]);

    //         await session.commitTransaction();
    //         session.endSession();  // ✅ Properly end session

    //         res.status(201).json({ message: "Booking created successfully", booking });
    //     } catch (error) {
    //         await session.abortTransaction();
    //         session.endSession();
    //         res.status(500).json({ message: "Transaction failed", error: error.message });
    //     }
    // } catch (error) {
    //     res.status(500).json({ message: "Server error", error: error.message });
    // }

    try {
      if (!sport || !seatNumber || !user) {
          return res.status(400).json({ message: "All fields are required" });
      }

   

      const session = await mongoose.startSession();
      session.startTransaction();  // ✅ Ensure transaction is started properly

      try {
          const [existingSport, existingUser] = await Promise.all([
              Sport.findById(sport).session(session),
              User.findById(user).session(session),
          ]);

          if (!existingSport) {
              await session.abortTransaction();
              session.endSession();
              return res.status(404).json({ message: "Sport not found with given ID" });
          }

          if (!existingUser) {
              await session.abortTransaction();
              session.endSession();
              return res.status(404).json({ message: "User not found with given ID" });
          }

          // Create booking
          const booking = new Booking({ sport,seatNumber, user });

          existingUser.booking.push(booking);
          existingSport.booking.push(booking);

          await Promise.all([
              existingUser.save({ session }),
              existingSport.save({ session }),
              booking.save({ session }),
          ]);

          await session.commitTransaction();
          session.endSession();  // ✅ Properly end session

          res.status(201).json({ message: "Booking created successfully", booking });
      } catch (error) {
          await session.abortTransaction();
          session.endSession();
          res.status(500).json({ message: "Transaction failed", error: error.message });
      }
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getBookingById = async (req, res, next) => {
  const id  = req.params.id;
  let booking;

  try {
    booking = await Booking.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Invalid booking  Id" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) =>{

    const id = req.params.id;
    let booking;

  try {
    booking = await Booking.findByIdAndDelete(id).populate("user sport");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.booking.pull(booking);
    await booking.sport.booking.pull(booking);
    await booking.sport.save({session});
    await booking.user.save({session});
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "unable to  delete booking" });
  }
  return res.status(200).json({  message: " succesfully delete booking "  });
};


