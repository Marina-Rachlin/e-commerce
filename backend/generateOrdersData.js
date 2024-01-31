import faker from 'faker';
import mongoose from 'mongoose';
import orderModel from './models/order.model.js';
import connectDB from "./db/db.js";

connectDB();

const generateRandomOrder = () => {
    const numberOfItems = faker.datatype.number({ min: 1, max: 6 }); // Use faker.datatype.number
    const items = [];
  
    for (let i = 0; i < numberOfItems; i++) {
      const item = {
        productId: new mongoose.Types.ObjectId(),
        quantity: faker.datatype.number({ min: 1, max: 10 }), // Use faker.datatype.number
      };
      items.push(item);
    }
  
    const order = {
      user:  new mongoose.Types.ObjectId(),
      cart: items,
      shippingAddress: {
        country: faker.address.country(),
        address: faker.address.streetAddress(),
      },
      paymentMethod: 'Credit Card',
      paymentInfo: {
        id: faker.datatype.uuid(),
        status: 'Paid',
        update_time: faker.date.past().toISOString(),
      },
      taxPrice: faker.datatype.number({ min: 1, max: 10 }), // Use faker.datatype.number
      shippingPrice: faker.datatype.number({ min: 0, max: 5 }), // Use faker.datatype.number
      totalPrice: faker.datatype.number({ min: 10, max: 100 }), // Use faker.datatype.number
      status: faker.random.arrayElement(['Processing', 'Delivered', 'Cancelled', 'Pending']),
      paidAt: faker.date.past(),
      isDelivered: faker.datatype.boolean(), // Use faker.datatype.boolean
      deliveredAt: faker.date.past(),
    };
  
    return order;
  };
  

  // Function to create and save 50 orders
const createAndSaveOrders = async () => {
    try {
  
      for (let i = 0; i < 50; i++) {
        const randomOrder = generateRandomOrder();
        const createdOrder = await orderModel.create(randomOrder);
      }
    } catch (error) {
      console.error('Error creating orders:', error);
    } 
  };
  
  // Call the function to create and save orders
  createAndSaveOrders();