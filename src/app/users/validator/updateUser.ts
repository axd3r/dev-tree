import validator from "validator";
import User from "../models/User";

interface UpdateUserParams {
    name?: string;
    lastname?: string;
    nickname?: string;
    email?: string;
    password?: string;
}

const UpdateUserValidator = async (params: UpdateUserParams, userId: string): Promise<boolean> => {
    if (!params || typeof params !== "object") {
        throw new Error("Invalid user data.");
    }
        
    if (params.name !== undefined) {
        if (validator.isEmpty(params.name)) {
            throw new Error("The name needs a valid value.");
        }
        if (!validator.isLength(params.name, { min: 3, max: 50 })) {
            throw new Error("The name must be between 3 and 50 characters.");
        }
    }

    if (params.lastname !== undefined) {
        if (validator.isEmpty(params.lastname)) {
            throw new Error("The lastname needs a valid value.");
        }
        if (!validator.isLength(params.lastname, { min: 3, max: 50 })) {
            throw new Error("The lastname must be between 3 and 50 characters.");
        }
    }

    if (params.nickname !== undefined) {
        if (validator.isEmpty(params.nickname)) {
            throw new Error("The nickname needs a valid value.");
        }
        if (!validator.isLength(params.nickname, { min: 3, max: 50 })) {
            throw new Error("The nickname must be between 3 and 50 characters.");
        }

        const existingNickname = await User.findOne({ nickname: params.nickname });
        if (existingNickname && existingNickname._id.toString() !== userId) {
            throw new Error("Nickname is already in use by another user.");
        }
    }

    if (params.email !== undefined) {
        if (validator.isEmpty(params.email)) {
            throw new Error("The email needs a valid value.");
        }
        if (!validator.isEmail(params.email)) {
            throw new Error("The email format is invalid.");
        }

        const existingEmail = await User.findOne({ email: params.email });
        if (existingEmail && existingEmail._id.toString() !== userId) {
            throw new Error("Email is already in use by another user.");
        }
    }

    if (params.password !== undefined) {
        if (validator.isEmpty(params.password)) {
            throw new Error("The password needs a valid value.");
        }
        if (!validator.isLength(params.password, { min: 6 })) {
            throw new Error("The password must have at least 6 characters.");
        }
    }

    return true;
};

export default UpdateUserValidator;
