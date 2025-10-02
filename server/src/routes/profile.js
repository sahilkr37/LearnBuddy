import express from 'express'
import User from '../models/userSchema.js';
import { verifyToken } from '../middlewares/auth.js';

const profileRouter = express.Router()

profileRouter.get('/profile/view/:id', verifyToken, async (req, res) => {

    try {
        if (req.user.id !== req.params.id && req.user._id !== req.params.id) {
            return res.status(403).json({ error: "Unauthorized access" });
        }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user)
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
})

profileRouter.put('/profile/edit/:id', verifyToken, async (req, res) => {

    try {
        if (req.user.id !== req.params.id && req.user._id !== req.params.id) {
            return res.status(403).json({ error: "Unauthorized access" });
        }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const allowedUpdates = ['firstName', 'lastName', 'dateOfBirth', 'gender', 'bio', 'profilePhoto', 'skillsKnown', 'skillsWantToLearn'];
        let updateData = {}
        allowedUpdates.forEach(field => {
            if ((field in req.body)) {
                updateData[field] = req.body[field];
            }
        })
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
            res.json(updatedUser)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
})

profileRouter.delete('/profile/delete/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && req.user._id !== req.params.id) {
            return res.status(403).json({ error: "Unauthorized access" });
        }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            res.json(deletedUser)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }

})

export default profileRouter