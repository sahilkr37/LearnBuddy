import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }

}, { timestamps: true })
connectionRequest.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequest)
export default ConnectionRequest