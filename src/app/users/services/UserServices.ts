import User from "../models/User";

export class UserService {
    async save (userData: any) {
        const user = new User(userData);
        return await user.save();
    }

    async getAll () {
        const data = await User.find();
        return data 
    }

    async findOne (id: string) {
        const data = await User.findById(id);
        return data
    }

    async update (userId: string, userData: any) {
        const user = await User.findByIdAndUpdate(userId, userData, {new: true});
        return user;
    }

    async remove (userId: string) {
        return await User.findByIdAndDelete(userId);
    }
}