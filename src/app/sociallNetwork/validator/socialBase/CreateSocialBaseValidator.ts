import validator from "validator";
import SocialBase from "../../models/socialBase/SocialBase";

interface SocialParams {
    platform: string;
    icon?: string;
}

const SocialBaseCreateValidator = async(params: SocialParams): Promise<boolean> => {
    if (!params || typeof params !== "object") {
        throw new Error("Invalid social base data.");
    }

    if (!params.platform || validator.isEmpty(params.platform)) {
        throw new Error("Platform is required.");
    }

    const existingPlatForm = await SocialBase.findOne({ platform: params.platform });
    if (existingPlatForm) throw new Error('Platform is already exists');

    if (params.icon !== undefined) {
        if (!validator.isURL(params.icon)) {
            throw new Error("Icon must be a valid URL.");
        }
    }

    const existingIcon = await SocialBase.findOne({icon: params.icon});
    if (existingIcon) throw new Error('Icono o logo ya registrado');

    return true;
};

export default SocialBaseCreateValidator;
