import validator from "validator";
import SocialBase from "../../models/socialBase/SocialBase";

interface SocialUpdateParams {
    id: string;
    platform?: string;
    icon?: string;
}

const SocialBaseUpdateValidator = async (params: SocialUpdateParams, socialId: string): Promise<boolean> => {
    if (!params || typeof params !== "object") {
        throw new Error("Invalid update data.");
    }

    const { platform, icon } = params;

    if (!socialId || validator.isEmpty(socialId)) {
        throw new Error("ID is required for update.");
    }

    if (!validator.isMongoId(socialId)) {
        throw new Error("Invalid social network ID.");
    }

    const existingSocial = await SocialBase.findById(socialId);
    if (!existingSocial) {
        throw new Error("Social base record not found.");
    }

    if (platform !== undefined) {
        if (validator.isEmpty(platform)) {
            throw new Error("Platform cannot be empty.");
        }

        if (platform !== existingSocial.platform) {
            const duplicate = await SocialBase.findOne({ platform });
            if (duplicate) {
                throw new Error("Another record with this platform already exists.");
            }
        }
    }

    if (icon !== undefined) {
        if (!validator.isURL(icon)) {
            throw new Error("Icon must be a valid URL.");
        }
    }

    return true;
};

export default SocialBaseUpdateValidator;
