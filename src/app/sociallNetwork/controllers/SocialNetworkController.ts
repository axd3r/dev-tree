import { Request, Response } from "express";
import { SocialNetworkService } from "../services/SocialNetworkServices";
import SocialNetworkValidator from "../validator/CreateSocialNetworkValidator";
import UpdateSocialNetworkValidator from "../validator/UpdateSocialNetworkValidator";
import { CreateSocialNetworkResponse } from "../responses/CreateSocialNetworkResponse";
import { FindOneSocialNetworkResponse } from "../responses/FindOneSocialNetworkResponse";
import { UpdateSocialNetworkResponse } from "../responses/UpdateSoialNetworkResponse";
import { DeleteSocialNetworkResponse } from "../responses/DeleteSocialNetworkResponse";

const socialService = new SocialNetworkService();

export const save = async (req: Request, res: Response) => {
    try {
        const params = req.body;
        await SocialNetworkValidator(params);

        const network = await socialService.save(params);

        const response = CreateSocialNetworkResponse.success(network);
        return res.status(response.status).json(response);
    } catch (error) {
        const response = CreateSocialNetworkResponse.serverError(error);
        return res.status(response.status).json(response);
    }
};

export const getAll = async (_req: Request, res: Response) => {
    try {
        const data = await socialService.getAll();
        return res.status(200).json({ status: "success", data });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Server Error" });
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const socialId = req.params.socialId;
        const network = await socialService.findOne(socialId);

        if (!network) {
            const response = FindOneSocialNetworkResponse.notFound();
            return res.status(response.status).json(response);
        }

        const response = FindOneSocialNetworkResponse.success(network);
        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Server Error" });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const socialId = req.params.socialId;
        const data = req.body;
        await UpdateSocialNetworkValidator(data, socialId);

        const network = await socialService.update(socialId, data);

        if (!network) {
            const response = UpdateSocialNetworkResponse.notFound();
            return res.status(response.status).json(response);
        }

        const response = UpdateSocialNetworkResponse.success(network);
        return res.status(response.status).json(response);
    } catch (error) {
        const response = UpdateSocialNetworkResponse.serverError(error);
        return res.status(response.status).json(response);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const socialId = req.params.socialId;
        const networkDelete = await socialService.remove(socialId);

        if (!networkDelete) {
            const response = DeleteSocialNetworkResponse.notFound();
            return res.status(response.status).json(response);
        }

        const response = DeleteSocialNetworkResponse.success();
        return res.status(response.status).json(response);
    } catch (error) {
        const response = DeleteSocialNetworkResponse.serverError(error);
        return res.status(response.status).json(response);
    }
};

export const findByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const networkUser = await socialService.findByUserId(userId);

        return res.status(200).json({
            data: networkUser
        })

    } catch (error) {
        return res.status(500).json({
            data: error
        })
    }
}
