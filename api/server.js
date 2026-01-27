// Express backend API for MongoDB operations
// Run with: node api/server.js

import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let db = null;
let client = null;

// Connect to MongoDB
async function connectToMongoDB() {
    const mongoString = process.env.MONGODB_CONNECTION_STRING || process.env.VITE_MONGODB_CONNECTION_STRING;
    
    if (!mongoString) {
        console.warn('MongoDB connection string not found. API will not work.');
        return;
    }

    try {
        client = new MongoClient(mongoString);
        await client.connect();
        db = client.db('war_room');
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }
}

// Initialize connection
connectToMongoDB();

// Get all jobs
app.get('/api/jobs', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ error: 'MongoDB not connected' });
        }
        const jobs = await db.collection('jobs').find({}).sort({ createdAt: -1 }).toArray();
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Save/Update jobs (replace all)
app.post('/api/jobs', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ error: 'MongoDB not connected' });
        }
        const jobs = req.body;
        
        // Delete all existing jobs and insert new ones
        await db.collection('jobs').deleteMany({});
        if (jobs.length > 0) {
            await db.collection('jobs').insertMany(jobs);
        }
        
        res.json({ success: true, count: jobs.length });
    } catch (error) {
        console.error('Error saving jobs:', error);
        res.status(500).json({ error: 'Failed to save jobs' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        mongodb: db ? 'connected' : 'disconnected' 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 API server running on http://localhost:${PORT}`);
});
