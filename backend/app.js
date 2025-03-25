import express from "express";
import cors from "cors";
import mongoose  from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import sportRouter from "./routes/sport-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
// import "./routes/user-routes.js"
dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:3001",  // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    // allowedHeaders: "Content-Type,Authorization"
  }));
app.use(cors());
app.use(express.json());
// middleware
 app.use("/user", userRouter); 
 app.use("/admin", adminRouter); 
 app.use("/sport", sportRouter);
 app.use("/booking", bookingsRouter);

mongoose.connect(
    `mongodb+srv://Admin:${process.env.MONGODB_PASSWORD}@cluster1.blcft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`

)
.then(()=>
   console.log("connected")
).catch((e)=> console.log(e)) ;



app.listen(3000,()=>{
    console.log(`The server is running ${3000}`);
  })



