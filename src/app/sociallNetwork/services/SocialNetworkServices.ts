import User from "../../users/models/User";
import SocialNetwork from "../models/SocialNetwork";

export class SocialNetworkService {
    async save(data: any) {
        if (data.userId) {
            const userExists = await User.findById(data.userId);
            if (!userExists) {
                throw new Error("The userId provided does not exist.");
            }
        }
        const socialNetwork = new SocialNetwork(data);
        return await socialNetwork.save();
    }

    async getAll() {
        return await SocialNetwork.find();
    }

    async findOne(id: string) {
        return await SocialNetwork.findById(id);
    }

    async update(id: string, data: any) {
        if (data.userId) {
            const userExists = await User.findById(data.userId);
            if (!userExists) {
                throw new Error("The userId provided does not exist.");
            }
        }
        return await SocialNetwork.findByIdAndUpdate(id, data, { new: true });
    }

    async remove(id: string) {
        return await SocialNetwork.findByIdAndDelete(id);
    }

    async findByUserId(userId: string) {
        if (userId) {
            const userExists = await User.findById(userId);
            if (!userExists) {
                throw new Error("The userId provided does not exist.");
            }
        }

        const socialNetworks = await SocialNetwork.find({ userId });
        return socialNetworks;
    }
}
