
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {

    const body = await req.json()

    if(!body) {
        return NextResponse.json({statusCode: 400, message: 'Body is Empty', status: false})
    }

    console.log(body)
    const response = await prisma.admin.findFirst({
        where: {
            email: body.email,
            password: body.password
        }
    })

    console.log(response)

    if(!response) {
        return NextResponse.json({statusCode: 400, message: 'Invalid Credential' , status: false})
    }

    return NextResponse.json({statusCode: 400, response, status: true})
}

