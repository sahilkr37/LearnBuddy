import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import ConnectionRequest from '../models/connectionRequest.js'
const connectionRouter = express.Router()

connectionRouter.post('/request/send/:status/:toUserId', verifyToken, async (req, res) => {
    try {
        const { status, toUserId } = req.params;
        if (req.user._id == toUserId) {
            return res.status(400).json({ error: "You cannot send request to yourself" })
        }

        const existing = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: req.user._id, toUserId },
                { fromUserId: toUserId, toUserId: req.user._id }
            ]
        })
        if (existing) {
            return res.status(400).json({ error: "connection request already exist" })
        }
        if (status != 'ignored' && status != 'interested') {
            return res.status(400).json({ error: "Invalid status" })
        }
        const request = await ConnectionRequest.create({
            fromUserId: req.user._id,
            toUserId: toUserId,
            status: status
        })

        res.json({ message: "Connection sent successfully" })
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

connectionRouter.post('/request/review/:status/:requestId', verifyToken, async (req, res) => {

    try {
        const { status, requestId } = req.params
        if (status !== 'accepted' && status !== 'rejected') {
            return res.json({ error: "status not valid" })
        }

        const request = await ConnectionRequest.findOne({
            _id: requestId, toUserId: req.user._id, status: 'interested'
        })
        if (!request) {
            return res.status(400).json({ error: "Invalid or already reviewed request" })
        }
        request.status = status;
        await request.save();

        res.json({ message: `Request ${status} successfully` });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

export default connectionRouter