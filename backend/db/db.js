import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbUrl = process.env.DB_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`Database connected with ${mongoose.connection.host}`);
    } catch (error) {
        console.error(error.message);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
