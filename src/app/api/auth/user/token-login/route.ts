import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils/jwtToken";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

    const body = await req.json()
    
    const {token} = body

    const verificationOfToken: any = verifyToken(token)

    const {email} = verificationOfToken

    console.log(email)

    if(!verificationOfToken) {
        return NextResponse.json({statusCode: 400, message: 'Token Expired Please login', status: false})
    }

    const response = await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true,
            name: true, 
            email: true,
            phoneNumber: true,
            createdAt: true
        }
    })

    console.log(response)

    return NextResponse.json({statusCode: 200, response, status: true})
}