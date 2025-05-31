import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { CreateUserResponse } from "../responses/CreateUserResponse";
import UserValidator from "../validator/createUser";
import { FindOneUserResponse } from "../responses/FindOneUserResponse";
import { UpdateUserResponse } from "../responses/UpdateUserResponse";
import UpdateUserValidator from "../validator/updateUser";
import { DeleteUserResponse } from "../responses/DeleteUserResponse";
import * as bcrypt from 'bcrypt';
import { AuthenticatedRequest } from "../../middleware/authMiddleware";

const userService = new UserService();

const save = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        try {
            UserValidator(body);
        } catch (error) {
            const err = error as Error;

            return res.status(400).json({
                status: "error",
                message: err.message
            })
        }

        body.password = await bcrypt.hash(body.password, 10);

        const user = await userService.save(body);

        const response = CreateUserResponse.success(user);

        return res.status(response.status).json(response);
        
    } catch (error) {
        const response = CreateUserResponse.serverError(error);
        return res.status(response.status).json(response);
    }
}

const getAll = async (_req: Request, res: Response) => {
    try {
        const data = await userService.getAll();

        return res.status(200).json({ status: "success", data });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Server Error" });
    }
}

const findOne = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const user = await userService.findOne(id);

        if (!user) {
            const response = FindOneUserResponse.notFound();
            return res.status(response.status).json(response);
        }

        const response = FindOneUserResponse.success(user);
        return res.status(response.status).json(response);
    } catch (error) {
        const response = FindOneUserResponse.serverError(error);
        return res.status(response.status).json(response);
    }
};

const update = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.params.userId;
        const requester = req.user;
        const userData = req.body;

        if (requester?.id !== userId && requester?.role !== "superadmin") {
            return res.status(403).json({
                status: "error",
                message: "No tienes permiso para actualizar este perfil.",
            });
        }

        try {
            await UpdateUserValidator(userData, userId);
        } catch (error) {
            const err = error as Error;
            return res.status(400).json({
                status: "error",
                message: err.message,
            });
        }

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10);
        }

        const user = await userService.update(userId, userData);

        if (!user) {
            const response = FindOneUserResponse.notFound();
            return res.status(response.status).json(response);
        }

        const response = UpdateUserResponse.success(user);
        return res.status(response.status).json(response);

    } catch (error) {
        const response = UpdateUserResponse.serverError(error);
        return res.status(response.status).json(response);
    }
};


const remove = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const userDelete = await userService.remove(userId);

        if (!userDelete) {
            const response = DeleteUserResponse.notFound();
            return res.status(response.status).json(response);
        }

        const response = DeleteUserResponse.success();
        return res.status(response.status).json(response);
    } catch (error) {
        const response = DeleteUserResponse.serverError(error);
        return res.status(response.status).json(response);
    }
}

module.exports = {
    save,
    getAll,
    findOne,
    update,
    remove
}