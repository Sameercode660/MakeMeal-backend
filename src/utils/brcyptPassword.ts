import bcrypt from 'bcrypt'

const saltRound: number = 10

export async function hashPassword(password: string): Promise<string> {

    const salt = await bcrypt.genSalt(saltRound)
    return bcrypt.hash(password, salt)

}


export function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
}