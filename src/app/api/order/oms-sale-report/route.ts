import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {

        const body = await req.json()

        const {startDate, endDate} = body

        const response: any = await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }, 
                status: 'close'
            }
        })

        const totalSale = response.reduce((accumulator: any, order: any) => (accumulator + order.totalPrice), 0)

        console.log(totalSale)

        const data = {
            totalSale,
            totalOrder: response.length
        }

        return NextResponse.json({statusCode: 200, message: 'successfully generated the report', data, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to generate the sales', status: false})
    }
}