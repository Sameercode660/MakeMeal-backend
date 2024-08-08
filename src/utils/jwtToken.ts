import jwt, {Secret, JwtPayload} from 'jsonwebtoken'

const secretKey: Secret = process.env.SECRET_KEY as string
const expiry = process.env.EXPIRES_IN as string

if(!secretKey || !expiry) {
    throw new Error('Environment variables SECRET_KEY and EXPIRES_IN must be defined')
}

export function generateToken(payload: object): string {
    return jwt.sign(payload, secretKey, {expiresIn: expiry})
}

export function verifyToken(token: string): JwtPayload | string | null {
    try {
        return jwt.verify(token, secretKey) as JwtPayload
    } catch (error) {
        return null
    }
} 

