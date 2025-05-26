import { model, Schema } from "mongoose";

const socialBaseSchema = new Schema({
    platform: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
        unique: true
    },
}, { timestamps: true });

export default model("SocialBase", socialBaseSchema, "social_bases");
