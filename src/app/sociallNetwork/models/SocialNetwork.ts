import { model, Schema } from "mongoose";

const socialNetworkSchema = new Schema({
    platform: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
        type: String,
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
}, { timestamps: true });

export default model("SocialNetwork", socialNetworkSchema, "social_networks");
