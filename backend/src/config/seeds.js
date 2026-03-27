import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";

dotenv.config({ path: "../../.env" });

const data = [
  {
    "name": "iPhone 14 Pro",
    "description": "Apple smartphone with A16 Bionic chip and 48MP camera",
    "price": 129999,
    "category": "Electronics",
    "stock": 15,
    "image": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-deep-purple-pdp-image-position-1a",
    "brand": "Apple",
    "rating": 4.8,
    "numReviews": 120
  },
  {
    "name": "Men Casual Shirt",
    "description": "Cotton slim fit casual shirt for men",
    "price": 999,
    "category": "Clothing",
    "stock": 50,
    "image": "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/14617780/2021/6/25/0a7d1e4c-3f2e-4e68-9e3d-b6a2d0b6c7e01624609918891Shirt1.jpg",
    "brand": "Levis",
    "rating": 4.2,
    "numReviews": 45
  },
  {
    "name": "Atomic Habits",
    "description": "Self-help book by James Clear",
    "price": 499,
    "category": "Books",
    "stock": 30,
    "image": "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    "brand": "Penguin",
    "rating": 4.7,
    "numReviews": 200
  },
  {
    "name": "Mixer Grinder",
    "description": "750W powerful mixer grinder for kitchen use",
    "price": 3499,
    "category": "Home & Kitchen",
    "stock": 20,
    "image": "https://rukminim2.flixcart.com/image/416/416/xif0q/mixer-grinder-juicer/k/v/q/-original-imagz6vzyx9g7qhh.jpeg",
    "brand": "Prestige",
    "rating": 4.3,
    "numReviews": 67
  },
  {
    "name": "Cricket Bat",
    "description": "Premium English willow cricket bat",
    "price": 5999,
    "category": "Sports",
    "stock": 10,
    "image": "https://rukminim2.flixcart.com/image/416/416/xif0q/bat/p/e/x/900-premium-english-willow-cricket-bat-original-imagqk3d5c8hhyzg.jpeg",
    "brand": "SG",
    "rating": 4.6,
    "numReviews": 34
  },
  {
    "name": "Face Wash",
    "description": "Refreshing face wash for daily skincare",
    "price": 299,
    "category": "Beauty",
    "stock": 100,
    "image": "https://rukminim2.flixcart.com/image/416/416/kz1lle80/face-wash/g/k/w/150-men-oil-clear-face-wash-garnier-original-imagb53r9kqg2rff.jpeg",
    "brand": "Nivea",
    "rating": 4.1,
    "numReviews": 80
  },
  {
    "name": "Remote Control Car",
    "description": "Rechargeable toy car with remote control",
    "price": 1499,
    "category": "Toys",
    "stock": 25,
    "image": "https://rukminim2.flixcart.com/image/416/416/k7c88sw0/remote-control-toy/v/t/p/remote-control-car-original-imafpj2gxzjghqhz.jpeg",
    "brand": "Hot Wheels",
    "rating": 4.4,
    "numReviews": 60
  },
  {
    "name": "Wireless Headphones",
    "description": "Bluetooth over-ear headphones with noise cancellation",
    "price": 2499,
    "category": "Electronics",
    "stock": 40,
    "image": "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX679_.jpg",
    "brand": "Sony",
    "rating": 4.5,
    "numReviews": 150
  },
  {
    "name": "Yoga Mat",
    "description": "Non-slip yoga mat for fitness and exercise",
    "price": 799,
    "category": "Sports",
    "stock": 60,
    "image": "https://rukminim2.flixcart.com/image/416/416/k5vcya80/yoga-mat/6/g/y/4mm-yoga-mat-boldfit-original-imafzgrh7zq5v3gf.jpeg",
    "brand": "Boldfit",
    "rating": 4.3,
    "numReviews": 90
  },
  {
    "name": "Notebook Set",
    "description": "Pack of 5 ruled notebooks for students",
    "price": 199,
    "category": "Other",
    "stock": 200,
    "image": "https://rukminim2.flixcart.com/image/416/416/l0pm3680/notebook/x/y/z/classmate-long-notebook-original-imagcdz9v8vhhz9z.jpeg",
    "brand": "Classmate",
    "rating": 4.0,
    "numReviews": 20
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Product.deleteMany();
    await Product.insertMany(data);

    console.log("Data inserted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();