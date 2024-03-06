import faker from 'faker';
import productModel from './models/product.model.js';
import connectDB from "./db/db.js";
import {v2 as cloudinary} from "cloudinary"; 

connectDB();

const generateProduct = () => {

  const brandNames = ['Chanel', 'Loreal', 'Cosrx', 'Olaplex', 'Ordinary', 'Zara'];

  const imageUrls = [

    'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656063/products/nnxkmgiyenfywwo91mxm.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656064/products/smm29llisyj6rileu7np.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656066/products/ms3mjwn3nx2lhzgqtbxt.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656067/products/no1vnmgcmqhemmri1woe.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656069/products/bnturoytuexuyufqzndq.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656070/products/a490gwacpujtm0llmmkz.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656071/products/ojt7duskno4nuzpwreav.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656072/products/f9uqbv7q3etvpelprp84.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656074/products/oz2rct3twqyc2e8qajc3.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656076/products/jvweumj2m6b4edo3bos9.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656078/products/q1jgg4qa22zwqbb5mcm8.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656079/products/dkql4z3bjeywukym9zdx.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656081/products/d9lpujipksr0wjoexqhy.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656083/products/y56ct19vhplyl6p4eb0k.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656084/products/vxfgat8sx0g48ktaxp6e.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656086/products/hen8vxik3qtuk9l3ycir.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656088/products/vibepuxhwgq2r3ejbtpn.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656090/products/hsze8hwxpnc3pa6lfwlw.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656092/products/okhtfyycia2txnqh3t8w.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656094/products/lrtqunepit7u8cenrydk.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656096/products/aqhmqjymxzkbtcwmdutk.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656097/products/x4pgdt8ijvfi3wnep7vw.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656098/products/ads17lns3mgqczacacaw.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656099/products/m9kfettvased82ew85wy.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656100/products/xvutw9jla6cge1946ghy.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656101/products/vvhqk03yrjvd2y9hx9fk.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656102/products/adelet0s5rbdxpu2ph3r.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656103/products/nqul5dbql5avhwokmde9.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656171/products/szghpnqy7echefs8erz3.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656173/products/p4kkss5oxbvqzurfmsly.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656174/products/kdgjyfeuapekpe7jmq2l.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656176/products/bohu96pomqnzpmv1lkwz.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656177/products/mpv5efbnkdgmqejpyo6k.png',
  'https://res.cloudinary.com/dmdv8s9mz/image/upload/v1704656179/products/wyabormqnahpn5opxpoz.png'
  ];

  const productNames = [
    'Aqua Radiance Cream', 'Sunset Glow Serum', 'Natural Essence Lotion', 'Pure Skin Face Wash', 'Crystal-Infused Highlighter',
    'Prism Eyeshadow Palette', 'Hydrating Red Lip Stain',
    'Brightening Serum Cream',
    'Hydrating Lip Gloss Pack', 'Salt Spray Beachy Waves', 'Necessaire The Deodorant',
    'Makeup Smooth Brushes', 'Magical Eyelash Extensions', 'Floral New Perfume Mist',
    'Lip Stain & Makeup Box', 'Botanical Hair Shampoo',
    'Bamboo Fibers Shampoo', 'Organic Vitamin Cream', 'Eau De Perfume For Women', 'Poutsicle Hydrating Lip Stain',
    'Huile De Hemp Seed Olive Oil', 'Curology Face Cleanser', 'Coconut Balm Skin Salve', 
    'Cucumber Green Tea', 'Vitamin C Face Cleanser', 'Bleu Chanel De Perfume',
    'Les Beiges Eau De Lipistick'
  ];


  // Function to generate a single image object
  const generateImage = () => ({
    public_id: faker.datatype.uuid(),
    url: faker.random.arrayElement(imageUrls),
  });

  return {
    name: faker.random.arrayElement(productNames), 
    brand: faker.random.arrayElement(brandNames),
    description: faker.lorem.paragraph(),
    category: faker.random.arrayElement(['Makeup', 'Skin Care', 'Hair Care', 'Bath & Body', 'Accessories', 'Kids & Baby']),
    stock: Math.random() < 0.9 ? faker.datatype.number({ min: 1, max: 100 }) : 0,// 90% chance of stock > 0
    price: faker.datatype.number({ min: 10, max: 100 }),
    discountPrice: Math.random() < 0.7 ? faker.datatype.number({ min: 5, max: 50 }) : null,// 70% chance of discount
    images: Array.from({ length: 4 }, generateImage),
    isNewProduct: Math.random() < 0.6, 
    isHotProduct: Math.random() < 0.6, 
    discount: Math.random() < 0.5 ? faker.datatype.number({ min: 1, max: 50 }) : null, // Generate an array of 4 images
  };
};

const generateFakeData = (count) => Array.from({ length: count }, generateProduct);

const insertFakeData = async () => {
  try {
    const fakeProducts = generateFakeData(100); 
    const insertedProducts = await productModel.insertMany(fakeProducts);

    console.log(`${insertedProducts.length} fake products inserted successfully!`);
  } catch (error) {
    console.error('Error inserting fake data:', error);
  }
};

insertFakeData();