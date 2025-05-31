import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from "../../users/models/User";
import loginValidator from "../validators/loginValidator";
import { createToken } from "../services/jwt.service";

const AuthController = {
    async login(req: Request, res: Response) {

        const params = req.body;

        try {
            loginValidator(params);

            const userExisting = await User.findOne({
                email: params.email
            }).select('+password').lean();

            if (!userExisting) {
                return res.status(404).json({ 
                    status: 'error', 
                    message: 'Email and password id required' 
                });
            }

            const isMatch = await bcrypt.compare(params.password, userExisting.password);
            if (!isMatch) {
                return res.status(401).json({ 
                    status: 'error', 
                    message: 'Password incorrect' 
                });
            
            }

            const token = createToken({
                id: userExisting._id.toString(),
                email: userExisting.email,
                role: userExisting.role!
            });

            return res.status(200).json({
                status: 'success',
                message: 'Session started',
                token,
                user: {
                    id: userExisting._id,
                    email: userExisting.email,
                    role: userExisting.role
                }
            });
        } catch (error) {
            const err = error as Error;
            return res.status(500).json({ 
                status: 'error',
                message: err.message, 
            });
        }
    },
};

module.exports = AuthController;