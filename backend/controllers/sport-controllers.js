import { decrypt } from "dotenv";
import Admin from "../models/Admin.js";
import Sport from "../models/Sport.js"
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';


export const addSports = async (req, res) => {
  try {
    // Extract and validate token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const extractedToken = authHeader.split(" ")[1];

    let adminId;
    try {
      const decrypted = jwt.verify(extractedToken, process.env.SECRET_KEY);
      adminId = decrypted.id;
    } catch (err) {
      return res.status(403).json({ message: `Invalid token: ${err.message}` });
    }

    // Extract sport details from request body
    const { title, description, matchDate, posterUrl, featured, availableseat } = req.body;

    // Validate input
    if (!title?.trim() || !description?.trim() || !posterUrl?.trim() || !matchDate) {
      return res.status(422).json({ message: "Invalid Inputs" });
    }

    // Create new sport entry
    const sport = new Sport({
      title,
      description,
      matchDate: new Date(matchDate),
      posterUrl,
      featured: featured || false,
      availableseat,
      admin: adminId, // Use extracted adminId
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await sport.save({session});
    adminUser. addedsportEvent.push(sport);
    await adminUser.save({session});
    await session.commitTransaction();
    // Save to database
    // await sport.save(); 

    return res.status(201).json({ message: "Sport added successfully", sport });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

export const getAllSports = async (req, res, next) => {
  let sports;

  try {
    sports = await Sport.find();
  } catch (err) {
    return console.log(err);
  }

  if (!sports) {
    return res.status(500).json({ message: "sport not found" });
  }
  return res.status(200).json({ sports });
};

export const getSportById = async (req, res, next) => {
  const id  = req.params.id;
  let sports;

  try {
    sports = await Sport.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!sports) {
    return res.status(500).json({ message: "Invalid sport Id" });
  }
  return res.status(200).json({ sports });
};
