import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {userId} = body

        const response = await prisma.cart.deleteMany({
            where: {
                userId
            }
        })

        if(!response) {
            return NextResponse.json({statusCode: 200, message: 'No any item is available', status: true})
        }

        return NextResponse.json({statusCode: 200, response, message: 'Cart is cleared', status: true})
    } catch (error) {
        console.log(error)

        return NextResponse.json({statusCode: 500, message: 'Unable to clear '})
    }
}