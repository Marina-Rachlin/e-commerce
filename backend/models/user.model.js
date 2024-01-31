import dotenv from 'dotenv';
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator';

dotenv.config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      lowercase: true
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate( value ) {
        if( !validator.isEmail( value )) {
             throw new Error( 'Email is invalid' )
              }
      },
      trim: true,
    },
    password: {
      type: String, //because of social auth option we don't set password to require!
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Password will not be returned in query results
      trim: true,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
      index: true,
    },
    phoneNumber: {
      type: String,
    },
    addresses: [
      {
        country: {
          type: String,
          required: [true, 'Country is required'], 
        },
        city: {
          type: String,
        },
        address: {
          type: String,
          required: [true, 'Address 1 is required'], 
        },
        postalCode: {
          type: String, 
        }
      },
    ],    
    isVerified: {
      type: Boolean,
      default: false,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    totalSpent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Hash Password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

// sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: "5m",
  });
};

// sign refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET || "", {
    expiresIn: "3d",
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};


const userModel = mongoose.model("User", userSchema);

export default userModel;

//  resetPasswordToken: String,
//  resetPasswordTime: Date,
