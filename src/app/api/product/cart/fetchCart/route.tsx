import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {userId} = body

        const response = await prisma.cart.findMany({
            where: {
                userId
            },
            include: {
                user: true,
                product: true
            }
        })

        let subTotal = 0

        for(let i:number = 0; i < response.length; i++) {
            subTotal += response[i].amount
        }

        return NextResponse.json({statusCode: 200, response, status: true, subTotal})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'unable to fetch the data'})
    }
}