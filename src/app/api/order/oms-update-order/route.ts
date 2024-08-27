import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const primsa = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {orderId, status, updateStatus} = body

        const response = await primsa.order.update({
            where: {
                id: orderId,
                status: status
            },
            data: {
                status: updateStatus
            }

        })

        console.log(response)

        
        if(!response) {
            return NextResponse.json({statusCode: 404, message: 'Order not found', status: false})
        }

        return NextResponse.json({statusCode: 200, response, status: true})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to update the order state', status: false})
    }
}