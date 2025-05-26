import SocialBase from "../../models/socialBase/SocialBase";

export class SocialBasesService {
    async save(data: any) {
        const socialBases = new SocialBase(data);
        return await socialBases.save();
    }

    async getAll() {
        return await SocialBase.find();
    }

    async findOne(id: string) {
        const data = await SocialBase.findById(id);
        if ( !data ) throw new Error('Data not found');

        return data;
    }

    async update(id: string, data: any) {
        await this.findOne(id);
        return await SocialBase.findByIdAndUpdate(id, data, { new: true });
    }

    async remove(id: string) {
        await this.findOne(id);
        return await SocialBase.findByIdAndDelete(id);
    }
}
