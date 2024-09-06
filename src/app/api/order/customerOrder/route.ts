import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {userId} = body

        const response = await prisma.order.findMany({
            where: {
                userId: userId
            }
        })


        return NextResponse.json({statusCode: 200, response, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, messag: 'Unable to fetch the order details', status: false})
    }
}
