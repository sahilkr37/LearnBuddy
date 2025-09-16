import express from 'express'
import mongoose from 'mongoose'

import User from './models/userSchema.js'
import { connectDB } from './config/database.js'

const app = express()
app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save()

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.get('/userData', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
/*
app.patch('/profile/update/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: false })

        if (!updatedUser) res.status(404).json({ error: "user not found" });
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
*/

app.put('/profile/update/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.json(updatedUser)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

app.delete('/profile/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json(deletedUser)
    } catch (error) { 
        res.status(400).json({ error: error.message })
    }
})

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
}).catch((err) => {
    console.log('Error in DB connection')
})

