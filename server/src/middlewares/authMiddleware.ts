import { Request, Response, NextFunction } from "express";
import TokenService from "../services/token.service";
import { TokenPayload } from "../services/token.service";

// Extending the Request interface to include the user property
declare module "express-serve-static-core" {
    interface Request {
        user?: TokenPayload;
    }
}

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            throw new Error();
        }
        const userData = await TokenService.verifyAccessToken(accessToken) as TokenPayload;
        if (!userData) {
            throw new Error("User not found!");
        }
        req.user = userData;
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
    next();
}
