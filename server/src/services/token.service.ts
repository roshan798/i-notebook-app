import config from 'configs/config';
import jwt from 'jsonwebtoken';
import refreshModal from '@models/refresh.model';
import { User } from 'user';

type TokenPayload = {
    _id: string;
    email: string;
};

interface RefreshTokenDocument {
    token: string;
    userId: string;
}

class TokenService {
    generateAccessToken = (payload: TokenPayload): string => {
        return jwt.sign(payload, config.jwt.access_secret, { expiresIn: '1d' });
    };

    generateRefreshToken = (payload: TokenPayload): string => {
        return jwt.sign(payload, config.jwt.refresh_secret, { expiresIn: '30d' });
    };

    generateTokens(payload: TokenPayload): { accessToken: string; refreshToken: string } {
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
        return { accessToken, refreshToken };
    }

    async storeRefreshToken(token: string, userId: string): Promise<void> {
        try {
            await refreshModal.create({
                token: token,
                userId: userId,
            });
        } catch (error: any) {
            console.log(error.message);
        }
    }

    async verifyAccessToken(token: string): Promise<string | jwt.JwtPayload> {
        return jwt.verify(token, config.jwt.access_secret);
    }

    async verifyRefreshToken(refreshToken: string): Promise<string | jwt.JwtPayload> {
        return jwt.verify(refreshToken, config.jwt.refresh_secret);
    }

    async findRefreshToken(userId: string, refreshToken: string): Promise<RefreshTokenDocument | null> {
        return await refreshModal.findOne({
            userId: userId,
            token: refreshToken,
        });
    }

    async updateRefreshToken(userId: string, refreshToken: string): Promise<any> {
        return await refreshModal.updateOne({ _id: userId }, { token: refreshToken });
    }

    async removeToken(refreshToken: string): Promise<any> {
        return await refreshModal.deleteOne({ token: refreshToken });
    }
}

export default new TokenService();
