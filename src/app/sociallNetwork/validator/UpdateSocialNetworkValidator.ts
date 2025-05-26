import validator from "validator";
import mongoose from "mongoose";
import SocialNetwork from "../models/SocialNetwork";

interface SocialParams {
    socialBase?: string;
    username?: string;
    url?: string;
    userId?: string;
}

const UpdateSocialNetworkValidator = async (params: SocialParams, socialId: string): Promise<boolean> => {
    if (!validator.isMongoId(socialId)) {
        throw new Error("Invalid social network ID.");
    }

    if (params.socialBase !== undefined) {
        if (validator.isEmpty(params.socialBase)) {
            throw new Error("Social Network is required.");
        }
    }

    if (params.username !== undefined) {
        if (validator.isEmpty(params.username)) {
            throw new Error("Username is required.");
        }
    }

    if (params.url !== undefined) {
        if (!validator.isURL(params.url)) {
            throw new Error("A valid URL is required.");
        }

        const existingUrl = await SocialNetwork.findOne({ url: params.url });
        if (existingUrl && !existingUrl._id.equals(new mongoose.Types.ObjectId(socialId))) {
            throw new Error("URL is already in use by another record.");
        }
    }

    if (params.userId !== undefined) {
        if (!validator.isMongoId(params.userId)) {
            throw new Error("userId must be a valid MongoID.");
        }
    }

    return true;
};

export default UpdateSocialNetworkValidator;
