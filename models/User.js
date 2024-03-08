import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
        },
        role: {
            type: String,
            default: 'user',
        },
        image: {
            type: String,
            default: '/images/avatar.png',
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        defaultPaymentMethod: {
            type: String,
            default: '',
        },
        addresses: [
            {
                firstName: {
                    type: String,
                },
                lastName: {
                    type: String,
                },            
                firstName: {
                    type: String,
                },
                phoneNumber: {
                    type: String,
                },
                addressFirstLine: {
                    type: String,
                },
                addressSecondLine: {
                    type: String,
                },
                city: {
                    type: String,
                },
                zipCode: {
                    type: String,
                },
                country: {
                    type: String,
                },
                active: {
                    type: Boolean,
                    default: false,
                }
            }
        ],
        wishlist: [
            {
                product: {
                    type: ObjectId,
                    ref: "Product",
                },
                style: {
                    type: String,
                },
            },            
        ]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;