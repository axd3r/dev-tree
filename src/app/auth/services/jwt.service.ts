import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Role } from '../types/role';

dotenv.config();

type JwtExpiresIn = `${number}${'s' | 'm' | 'h' | 'd'}`;

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as JwtExpiresIn;


if(!JWT_SECRET) throw new Error('JWT is not defined in the field .env');
if(!JWT_EXPIRES_IN) throw new Error('JWT_EXPIRES_IN is not defined in the field .env');

export interface Payload {
    id: string;
    email: string;
    role: Role;
}

export const createToken = (user: Payload): string => {
    const payload: Payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    return jsonwebtoken.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

export const verifyToken = (token: string): Payload | null => {
    try {
        return jsonwebtoken.verify(token, JWT_SECRET) as Payload;
    } catch (error) {
        return null;
    }
}