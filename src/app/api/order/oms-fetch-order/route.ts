import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {

    try {

        const body = await req.json()

        const {status} = body

        console.log(status)

        const response = await prisma.order.findMany({
            where: {
                status: status
            },
            include: {
                user: true
            }
        })


        if(!response || response.length === 0) {
            return NextResponse.json({statusCode: 200, message: 'No any order is there', status: true})
        }

        return NextResponse.json({statusCode: 200, response, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to fetch the data', status: true})
    }

}