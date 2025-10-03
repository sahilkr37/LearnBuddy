import express from 'express'
import { verifyToken } from '../middlewares/auth.js';
import ConnectionRequest from '../models/connectionRequest.js'

const userRouter = express.Router();

userRouter.get('/user/connections', verifyToken, async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUserId, status: 'accepted' },
                { fromUserId: loggedInUserId, status: 'accepted' }
            ]
        }).populate('fromUserId', 'firstName lastName email')
            .populate('toUserId', 'firstName lastName email');

        const connectedUsers = connections.map(conn => {
            if (conn.fromUserId._id.toString() === loggedInUserId.toString()) return conn.toUserId
            else return conn.fromUserId
        })
        res.json(connectedUsers)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
})
userRouter.get('/user/requests', verifyToken, async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const requests = await ConnectionRequest.find({
            toUserId: loggedInUser, status: 'interested'
        }).populate('fromUserId', 'firstName lastName email')


        if (requests.length === 0) {
            return res.json({ message: "No pending requests" });
        }

        res.json(requests)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
})
export default userRouter