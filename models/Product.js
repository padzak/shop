import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const reviewSchema = new mongoose.Schema({
    reviewBy: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    review: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,        
    },
    style: {
        type: String,
        image: String,
        required: false,
    },
    fit: {
        type: String,
        required: false,
    },
    images: [],
    likes: [],
});
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: false,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    category: {
        type: ObjectId,
        required: true,
        ref: "Category",
    },
    subCategories: [
        {
            type: ObjectId,
            ref: "SubCategory",
        }
    ],
    details: [
        {
            name: String,
            value: String,
        },
    ],
    questions: [
        {
            question: String,
            answer: String,
        },
    ],
    reviews: [
        reviewSchema
    ],
    refundPolicy: {
        type: String,
        default: "14 days",
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    shipping: {
        type: Number,
        required: true,
        default: 0,
    },
    subProducts: [
        {
            images: [],
            description_images: [],
            color: {
                type: String,
            },
            image: {
                type: String,
            },
            sizes: [
                {
                    size: String,
                    quantity: Number,
                    price: Number,
                }
            ],
            discount: {
                type: Number,
                default: 0,
            },
            sold: {
                type: Number,
                default: 0,
            },
        },
    ],
},
{
    timestamps: true,
});

const Product = mongoose.model.Product || mongoose.model("Product", productSchema);
export default Product;