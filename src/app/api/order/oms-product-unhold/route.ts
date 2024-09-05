import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {productId} = body

        const response = await prisma.product.update({
            where: {
                productId
            },
            data: {
                availability: true
            }
        })

        return NextResponse.json({statusCode: 200, message: 'product is unhold successfully', response, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to unhold the product', status: false})
    }
}