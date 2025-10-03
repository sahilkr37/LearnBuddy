import express from 'express'
import User from '../models/userSchema.js';
import { verifyToken } from '../middlewares/auth.js';
import bcrypt from 'bcrypt'

const profileRouter = express.Router()

profileRouter.get('/profile/view', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user)
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
})

profileRouter.put('/profile/edit', verifyToken, async (req, res) => {

    try {
        const user = await User.findById(req.user._id)
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

profileRouter.delete('/profile/delete', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        try {
            const deletedUser = await User.findByIdAndDelete(req.user._id)
            res.json(deletedUser)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }

})

profileRouter.put('/profile/passwordChange', verifyToken, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ error: "Both new and old password are required" })
        }
        if (oldPassword == newPassword) {
            return res.status(400).json({ error: "Old and new password cannot be same" })
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "Please log in first" })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: "Password is incorrect" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword
        await user.save();
        res.clearCookie("token");
        res.json({ message: "Password changed successfully. Please log in again." });

    } catch (error) {
        console.error("Password Change Error:", error);
        return res.status(403).json({ error: "Server error" });
    }
})

export default profileRouter