import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    sport:{
        type: mongoose.Types.ObjectId,
        ref:"Sport",
        required: true,
    },
    seatNumber:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true,
    },

});

export default mongoose.model("Booking", BookingSchema);
