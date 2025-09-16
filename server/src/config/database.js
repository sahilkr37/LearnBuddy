import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sahilkr37:012004@cluster0.mmu9o5k.mongodb.net/learnbuddy')
}
