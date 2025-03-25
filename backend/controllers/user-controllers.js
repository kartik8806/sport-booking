
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Booking from "../models/Booking.js";


 export const getAllUsers = async (req, res, next ) =>{
    let users;
    try{
        users = await User.find();
    } catch (err){
        return  console.log(err);
    }

    if (!users){
        return res.status(500).json({message: " unexpected error Occured"});
    }

    return res.status(200).json({users});
};



export const   signup = async (req,res, next )=>{
    const { name, email, password } = req.body;
    if(!name || name.trim()===" " || !email || email.trim()==="" || !password || password.trim()===""){
        return res.status(422).json({message:"Invalid input"})
    }
     
    const hashedPassword = bcrypt.hashSync("password");

    let user;
    try{
        user = new User({name , email , password:hashedPassword });
        user =  await user.save();

    }catch(err){
        return console.log(err);

    }
    if(!User){
        return res.status(500).json({message: " unexpected error Occured"});
    }
    return res.status(201).json({id: user._id});
 
        
    

};

export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (
      !name &&
      name.trim() === "" ||
      !email &&
      email.trim() === "" ||
      !password &&
      password.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    const hashedPassword = bcrypt.hashSync(password);
  
    let user;
    try {
      user = await User.findByIdAndUpdate(id, {
        name,
        email,
        password: hashedPassword,
      });
    } catch (errr) {
      return console.log(errr);
    }
    if (!user) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Updated Sucessfully" });
  };
  
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findByIdAndDelete(id);
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    return res.status(200).json({ message: "Deleted Successfully" });
};

export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Unexpected Error Occured" });
    }
    return res.status(200).json({ user });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || email.trim() === "" || !password || password.trim() === "") {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
  
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "Unable to find user from this ID" });
    }
  
    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);
  
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
  
    return res
      .status(200)
      .json({ message: "Login Successfull", id: existingUser._id });
  };


  export const getBookingOfUser = async (req, res, next) => {
    const id  = req.params.id;
    let booking;
  
    try {
      booking = await Booking.find({user:id});
    } catch (err) {
      return console.log(err);
    }
  
    if (!booking) {
      return res.status(500).json({ message: " unable get booking" });
    }
    return res.status(200).json({ booking });
  };
  