import faker from 'faker';
import mongoose from 'mongoose';
import connectDB from "./db/db.js";
import bcrypt from "bcrypt";
import userModel from "./models/user.model.js";

connectDB(); 

// List of possible avatar URLs
const avatarUrls = [
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659815/avatars/l4wngddehlmdbmkr2ctz.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659851/avatars/fa05uzdpvqshecxytfkc.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659854/avatars/fxgrqwenzxcgq9o80acd.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659861/avatars/mvtbx6boksbfyv4z22lr.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659865/avatars/gknraowpurhyhpbkxnne.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659871/avatars/ehrh1qlw1hi9xcwwf7wu.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659873/avatars/oen5wjuo7xmmb0eb9le6.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659881/avatars/w1zmheehiqekg6pkoznh.webp',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659883/avatars/jm5apbmctap5ak5ohy8e.webp',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1706659888/avatars/kmshjdb35adjn84lysuj.webp',
];

// Function to generate a random avatar URL
const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarUrls.length);
  return avatarUrls[randomIndex];
};

// Function to create and save 50 fake users
const createAndSaveFakeUsers = async () => {
  try {
    for (let i = 0; i < 50; i++) {
      const fakeUser = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatar: {
          public_id: faker.datatype.uuid(),
          url: getRandomAvatar(),
        },
        role: 'user',
        phoneNumber: faker.phone.phoneNumber(),
        addresses: [
          {
            country: faker.address.country(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            postalCode: faker.address.zipCode(),
          },
        ],
        isVerified: faker.datatype.boolean(),
        totalSpent: faker.datatype.number({ min: 0, max: 1000 }), // You can adjust the range as needed
      };

      const createdUser = await userModel.create(fakeUser);
      console.log(`Created user with ID: ${createdUser._id}`);
    }

    console.log('Fake users created successfully');
  } catch (error) {
    console.error('Error creating fake users:', error);
  } 
};

// Call the function to create and save fake users
createAndSaveFakeUsers();
