import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    middleName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        immutable: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    bio: { type: String, trim: true },
    skillsKnown: { type: [String], default: [] },
    skillsWantToLearn: { type: [String], default: [] },
    profilePhoto: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s" },

}, { timestamps: true })

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, 'my_secret_key', { expiresIn: "7d" })
    return token
}

const User = mongoose.model("User", userSchema);
export default User;