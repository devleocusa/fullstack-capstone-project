/*jshint esversion: 8 */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pinoLogger from './logger.js'; // Note the .js extension
import pinoHttp from 'pino-http';

import connectToDatabase from './models/db.js'; // Note the .js extension
import { loadData } from "./util/import-mongo/index.js"; // Note the .js extension

// Route files
import giftRoutes from './routes/giftRoutes.js'; // Note the .js extension
import authRoutes from './routes/authRoutes.js'; // Note the .js extension
import searchRoutes from './routes/searchRoutes.js'; // Note the .js extension

const app = express();
app.use("*", cors());
const port = 3060;

// Connect to MongoDB; we just do this one time
connectToDatabase()
    .then(() => {
        pinoLogger.info('Connected to DB');
    })
    .catch((e) => console.error('Failed to connect to DB', e));

app.use(express.json());

const logger = pinoLogger; // Use the imported pinoLogger

app.use(pinoHttp({ logger }));

// Use Routes
app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.get("/", (req, res) => {
    res.send("Inside the server");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});