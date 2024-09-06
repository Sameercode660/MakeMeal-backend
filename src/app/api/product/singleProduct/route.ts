import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST (req: NextRequest) {
    try {
        const body = await req.json()

        const {productId} = body

        const response = await prisma.product.findUnique({
            where: {
                productId
            }
        })


        return NextResponse.json({statusCode: 200, response, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 404, message: 'Unable to find the prodcut', status: false})
    }
}