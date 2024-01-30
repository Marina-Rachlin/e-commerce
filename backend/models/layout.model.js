import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: String,
    answer: String,
});

const categorySchema = new mongoose.Schema({
    title: String,
});

// const bannerImageSchema = new mongoose.Schema({
//     public_id: String,
//     url: String,
// });

const bannerSchema = new mongoose.Schema({
    image: {
        public_id: String,
        url: String,
    },
    title: String,
    subtitle: String,
    discount: Number,
    blackFriday: Boolean,
});

const layoutSchema = new mongoose.Schema({
    type: String,
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
        image: bannerSchema,
        title: String,
        subTitle: String,
    },
});

const LayoutModel = mongoose.model("Layout", layoutSchema);

export default LayoutModel;
