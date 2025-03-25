import express from 'express';
const sportRouter = express.Router();


import { addSports, getAllSports,getSportById } from "../controllers/sport-controllers.js"

sportRouter.post('/', addSports);
sportRouter.get('/', getAllSports );
sportRouter.get('/:id', getSportById );



export default sportRouter;
