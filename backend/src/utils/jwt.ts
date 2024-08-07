import jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET as string

if (!secret) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

export function generateToken(userId: string): string {
    return jwt.sign({ id: userId }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

export function generateRefreshToken(userId: string): string {
    return jwt.sign({ id: userId }, secret, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
    })
}

export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('error while verifying jwt token: ',error);
        return null;
    }
}