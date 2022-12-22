import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import {
  getNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
} from "./controllers/note.js";
import noteRouter from './routes/note.js'


const app = express();
app.use(express.json());

// lowdb connection
const adapter = new JSONFile(process.env.TEST ? "db.json" : "db.test.json");
const db = new Low(adapter);
await db.read();
db.data ||= { notes: [] };

app.use('/',noteRouter)

// // get all notes
// app.get("/", getNotes);

// // get notes by id
// app.get("/note/:id", getSingleNote);

// // create notes
// app.post("/note", createNote);

// // replace post
// app.put("/note/:id", updateNote);

// // delete post
// app.delete("/note/:id", deleteNote);

export { app, db };
