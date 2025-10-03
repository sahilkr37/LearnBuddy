import express from 'express'
import User from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import { validateUserData } from '../utils/validation.js'

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {

    try {
        const { isValid, errors } = validateUserData(req.body);

        if (!isValid) {
            return res.status(400).json({ errors });
        }
        const { firstName, lastName, email, password, dateOfBirth, gender, role, bio, skillsKnown, skillsWantToLearn, profile } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth,
            gender,
            role,
            bio,
            skillsKnown,
            skillsWantToLearn,
            profile
        });
        await newUser.save()

        res.status(201).json({
            message: "User registered successfully",
            user: newUser
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            })

            res.json({
                message: "Login successful", user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                }
            })
        } else {
            throw new Error("Invalid credentials")
        }


    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

authRouter.post('/logout', (req, res) => {
    try {
        res.clearCookie('token')
        res.json({ message: "Logout successfully" })
    } catch (error) {
        res.status(400).json({ message: "Can't logout" })
    }
})



export default authRouter