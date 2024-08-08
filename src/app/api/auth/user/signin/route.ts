import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateToken, verifyToken } from "@/utils/jwtToken";
import { comparePassword } from "@/utils/brcyptPassword";
import { emailValidation } from "@/utils/zodValidation";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    
    const body = await req.json()

    const {email, password} = body

    if(!email || !password) {
        return NextResponse.json({statusCode: 400, message: 'Empty input is provided', status: false})
    }

    const validEmail = emailValidation(email)

    if(!validEmail) {
        return NextResponse.json({statusCode: 400, message: 'incorrect input', status: false})
    }

    const checkEmailExistence = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!checkEmailExistence) {
        return NextResponse.json({statusCode: 400, message: 'Email does not exist', status: false})
    }

    const hashedPassword = checkEmailExistence.password

    const checkPassword = comparePassword(password, hashedPassword)

    if(!checkPassword) {
        return NextResponse.json({statusCode: 400, message: 'Invalid password', status: false})
    }

    const token = generateToken({email})

    return NextResponse.json({statusCode: 200, response: checkEmailExistence, token, status: true})
}