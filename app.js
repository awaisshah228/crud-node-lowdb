import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

import noteRouter from './routes/note.js'


const app = express();
app.use(express.json());

// lowdb connection
const adapter = new JSONFile(process.env.TEST ? "db.json" : "db.test.json");
const db = new Low(adapter);
await db.read();
db.data ||= { notes: [] };

app.use('/',noteRouter)

export { app, db };
