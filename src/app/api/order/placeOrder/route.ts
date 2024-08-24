import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import pusher from "@/utils/pusher";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {

        const body = await req.json()

        const { userId, items, totalPrice } = body

        console.log(userId, items, totalPrice)

        const response = await prisma.order.create({
            data: {
                userId,
                items,
                totalPrice
            }
        })

        if (!response) {
            return NextResponse.json({ statusCode: 404, message: 'Order is not created', status: false })
        }

        pusher.trigger("oms-orders", "new-order", {
            orderId: 123,
            userId: 1234,
            orderDetails: 'Order details'
        });

        pusher.trigger(`user-orders-123`, "order-confirmed", {
            message: "Your order has been placed successfully.",
            orderId: "id"
        });

        return NextResponse.json({ statusCode: 200, response, status: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ statusCode: 500, message: 'unable to place the order', status: true })
    }
}