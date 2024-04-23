import mongoose from 'mongoose';

require('dotenv').config();

const db = mongoose.createConnection(process.env.DATABASE_URL!);

export default db;
