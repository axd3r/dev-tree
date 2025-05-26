import { model, Schema } from "mongoose";

const socialNetworkSchema = new Schema({
    socialBase: {
        type: Schema.Types.ObjectId,
        ref: 'SocialBase',
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export default model("SocialNetwork", socialNetworkSchema, "social_networks");
