import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";



const prisma = new PrismaClient()

function generateOrderNumber() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit number
  }  

export async function POST(req: NextRequest) {
    try {

        const body = await req.json()

        const { userId, items, totalPrice } = body

        console.log(userId, items, totalPrice)

        let orderNumber = generateOrderNumber()

        const response = await prisma.order.create({
            data: {
                userId,
                items,
                totalPrice,
                orderNumber
            }
        })

        const deleteResponse = await prisma.cart.deleteMany({
            where:{
                userId: userId
            }
        })


        if (!response) {
            return NextResponse.json({ statusCode: 404, message: 'Order is not created', status: false })
        }

        return NextResponse.json({ statusCode: 200, response, status: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ statusCode: 500, message: 'unable to place the order', status: true })
    }
}