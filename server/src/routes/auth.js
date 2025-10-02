import express from 'express'
import User from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import validator from "validator";

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    const { firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        gender,
        role,
        bio,
        skillsKnown,
        skillsWantToLearn,
        profile } = req.body

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minSymbols: 1 })) {
            return res.status(400).json({ error: "Password must be at least 8 characters long and include a number & symbol" });
        }
        for (let skill of skillsKnown) {
            if (!validator.isLength(skill, { min: 2, max: 30 })) {
                return res.status(400).json({ error: `Skill too short/long: ${skill}` });
            }
        }
        for (let skill of skillsWantToLearn) {
            if (!validator.isLength(skill, { min: 2, max: 30 })) {
                return res.status(400).json({ error: `Skill too short/long: ${skill}` });
            }
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
        console.log("Entered:", password)
        console.log("Stored:", user.password)

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

export default authRouter