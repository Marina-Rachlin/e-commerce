import mongoose from 'mongoose';
import productModel from './models/product.model.js';
import connectDB from './db/db.js';

connectDB();

const clearData = async () => {
  try {
    await productModel.deleteMany({});
    console.log('Data cleared successfully!');
  } catch (error) {
    console.error('Error clearing data:', error);
  } finally {
    mongoose.disconnect();
  }
};

clearData();
