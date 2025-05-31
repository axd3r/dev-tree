import { Response } from "express";
import { AuthenticatedRequest } from "../../../middleware/authMiddleware";
import { SocialBasesService } from "../../services/socialBase/SocialBaseServices";
import SocialBaseCreateValidator from "../../validator/socialBase/CreateSocialBaseValidator";
import { CreateSocialBaseResponse } from "../../responses/socialBase/CreateSocialBaseResponse";
import { FindOneSocialBaseResponse } from "../../responses/socialBase/FindOneSocialBaseResponse";
import SocialBaseUpdateValidator from "../../validator/socialBase/UpdateSocialBaseValidator";
import { UpdateSocialBaseResponse } from "../../responses/socialBase/UpadateSocialBaseResponse";
import { DeleteSocialBaseResponse } from "../../responses/socialBase/DeleteSocialBaseResponse";

const socialService = new SocialBasesService();

const isSuperAdmin = (req: AuthenticatedRequest): boolean => {
    return req.user?.role === "superadmin";
};

export const save = async (req: AuthenticatedRequest, res: Response) => {
    if (!isSuperAdmin(req)) {
        return res.status(403).json({ status: "error", message: "Access denied: superadmin only" });
    }

    try {
        const params = req.body;
        await SocialBaseCreateValidator(params);

        const Base = await socialService.save(params);

        const response = CreateSocialBaseResponse.success(Base);
        return res.status(response.status).json(response);
    } catch (error) {
        const response = CreateSocialBaseResponse.serverError(error);
        return res.status(response.status).json(response);
    }
};

export const getAll = async (_req: AuthenticatedRequest, res: Response) => {
    try {
        const data = await socialService.getAll();
        return res.status(200).json({ status: "success", data });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Server Error" });
    }
};

export const findOne = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const socialId = req.params.socialId;
        const Base = await socialService.findOne(socialId);

        if (!Base) {
            const response = FindOneSocialBaseResponse.notFound();
            return res.status(response.status).json(response);
        }

        const response = FindOneSocialBaseResponse.success(Base);
        return res.status(response.status).json(response);
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Server Error" });
    }
};

export const update = async (req: AuthenticatedRequest, res: Response) => {
    if (!isSuperAdmin(req)) {
        return res.status(403).json({ status: "error", message: "Access denied: superadmin only" });
    }

    try {
        const socialId = req.params.socialId;
        const data = req.body;
        await SocialBaseUpdateValidator(data, socialId);

        const Base = await socialService.update(socialId, data);

        if (!Base) {
            const response = UpdateSocialBaseResponse.notFound();
            return res.status(response.status).json(response);
        }

        const response = UpdateSocialBaseResponse.success(Base);
        return res.status(response.status).json(response);
    } catch (error) {
        const response = UpdateSocialBaseResponse.serverError(error);
        return res.status(response.status).json(response);
    }
};

export const remove = async (req: AuthenticatedRequest, res: Response) => {
    if (!isSuperAdmin(req)) {
        return res.status(403).json({ status: "error", message: "Access denied: superadmin only" });
    }

    try {
        const socialId = req.params.socialId;
        const BaseDelete = await socialService.remove(socialId);

        if (!BaseDelete) {
            const response = DeleteSocialBaseResponse.notFound();
            return res.status(response.status).json(response);
        }

        const response = DeleteSocialBaseResponse.success();
        return res.status(response.status).json(response);
    } catch (error) {
        const response = DeleteSocialBaseResponse.serverError(error);
        return res.status(response.status).json(response);
    }
};