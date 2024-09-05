import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const response = await prisma.product.updateMany({
            where: {
                restaurantId: 164
            }, 
            data: {
                availability: false
            }
        })

        if(!response) {
            return NextResponse.json({statusCode: 500, message: 'unable to hold', status: false})
        }

        return NextResponse.json({statusCode: 200, message: 'Successfully hold', status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to hold the store', status: false})
    }
}