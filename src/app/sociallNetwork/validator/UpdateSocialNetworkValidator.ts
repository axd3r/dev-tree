import validator from "validator";
import SocialNetwork from "../models/SocialNetwork";

interface SocialParams {
    platform?: string;
    username?: string;
    url?: string;
    icon?: string;
    userId?: string;
}

const UpdateSocialNetworkValidator = async (params: SocialParams, socialId: string): Promise<boolean> => {

    if (params.platform !== undefined) {
        if (!params.platform || validator.isEmpty(params.platform)) {
            throw new Error("Platform is required.");
        }
    }

    if (params.username !== undefined) {
        if (!params.username || validator.isEmpty(params.username)) {
            throw new Error("Username is required.");
        }
    }

    if (params.url !== undefined) {
        if (!params.url || validator.isEmpty(params.url) || !validator.isURL(params.url)) {
            throw new Error("A valid URL is required.");
        }
        const existingUrl = await SocialNetwork.findOne({ url: params.url});
        if (existingUrl && existingUrl._id.toString() != socialId){
            throw new Error('Url is already in use by another user');
        }                                                                                                                       
    }

    if (params.icon !== undefined) {
        if (!validator.isURL(params.icon)) {
            throw new Error("Icon must be a valid URL.");
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
