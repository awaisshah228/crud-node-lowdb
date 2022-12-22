import { db } from "../app.js";
import { nanoid } from "nanoid";
import Joi from "joi";

// get all notes
export const getNotes = (req, res) => {

  const { notes } = db.data;
  return res.status(200).json(notes);

};


// get sngle note
export const getSingleNote = (req, res) => {

  const note = db.data.notes.find((p) => p.id === req.params.id);
  return res.json(note);

};


// createt note
export const createNote = async (req, res) => {

  const schema = Joi.object().keys({
    title: Joi.string().alphanum().min(3).max(30).required(),
    description: Joi.string().alphanum().min(10).max(30).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {

    return res.status(422).json({
      message: "Invalid request",
      data: req.body,
      error,
    });

  }

  const id = nanoid();
  db.data.notes.push({ ...req.body, id });
  await db.write();

  res.status(201).json({ ...req.body, id });
};


//update note
export const updateNote = async (req, res) => {

  const schema = Joi.object().keys({
    title: Joi.string().alphanum().min(3).max(30).required(),
    description: Joi.string().alphanum().min(10).max(30).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(422).json({
      message: "Invalid request",
      data: req.body,
      error,
    });
  }

  const note = db.data.notes.find((p) => p.id === req.params.id);
  note.title = req.body.title;
  note.description = req.body.description;
  await db.write();

  res.status(200).json(note);
};


//delete note
export const deleteNote = async (req, res) => {

  const tempNotes = db.data.notes.filter((p) => p.id !== req.params.id);
  db.data.notes = tempNotes;
  await db.write();
  
  res.status(202).json({ msg: "deleted" });

};
