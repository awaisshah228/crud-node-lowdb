import express from 'express'
import {
    getNotes,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote,
  } from "../controllers/note";
const router = express.Router();


// get all notes
router.get("/", getNotes);

// get notes by id
router.get("/note/:id", getSingleNote);

// create notes
router.post("/note", createNote);

// replace post
router.put("/note/:id", updateNote);

// delete post
router.delete("/note/:id", deleteNote);


export default router;