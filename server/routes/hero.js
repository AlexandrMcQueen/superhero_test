import express from "express";
import {createHero, deleteHero, getSingleHero, ListOfHeroes, updateHero} from "../controllers/hero.js";
import upload from "../middleware/upload.js";


const router = express.Router();


router.get('/hero',ListOfHeroes);
router.post('/hero',upload.array('files',12),createHero);
router.get('/hero/:id',getSingleHero);
router.patch('/hero',upload.array('files',12),updateHero);
router.delete('/hero/:id',deleteHero);

export default router;