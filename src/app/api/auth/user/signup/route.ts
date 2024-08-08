import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "@/utils/jwtToken";
import { hashPassword } from "@/utils/brcyptPassword";
import { emailValidation, nameValidatin, phoneNumberValidation } from "@/utils/zodValidation";


const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

    const body = await req.json()

    const {name, email, password, phoneNumber} = body

    if(!name || !email || !password || !phoneNumber) {
        return NextResponse.json({statusCode: 400, message: 'Any one filed is empty', status: false})
    }

    const validName = nameValidatin(name)
    const validEmail = emailValidation(email)
    const validPhone = phoneNumberValidation(phoneNumber)

    if(!validName || !validEmail || !validPhone) {
        return NextResponse.json({statusCode: 400, message: 'Wrong input entered', status: false})
    }


    const existUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(existUser) {
        return NextResponse.json({statusCode: 400, message: 'User already exists', status: false})
    }

    const response = await prisma.user.create({
        data: {
            name,
            email, 
            password: await hashPassword(password),
            phoneNumber
        }
    })

    if(!response) {
        return NextResponse.json({statusCode: 400, message: 'Unable to create the user', status: false})
    }

    const token = generateToken({email})

    return NextResponse.json({statusCode: 200, response, token, status: true})

}
