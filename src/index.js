import express from 'express';
import { connection } from './db/mongoose.js';
import { gamesRouter } from './routers/games.js';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express()

const port = process.env.PORT 
connection()


//Define Paths For Express Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))




app.use(express.json())
app.use(gamesRouter)

app.listen(port, () => {
    console.log("Server is Up on Port " + port)
})
