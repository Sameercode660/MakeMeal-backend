import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const { cartId } = body
        console.log(cartId)

        if (!cartId) {
            return NextResponse.json({ statusCode: 400, message: 'Cart id is not provided', status: false })
        }

        const response = await prisma.cart.delete({
            where: {
                id: cartId
            }
        })

        if (!response) {
            return NextResponse.json({ statusCode: 400, message: 'Unable to delete the item', status: false })
        }

        return NextResponse.json({ statusCode: 200, response, status: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ statusCode: 500, message: 'Unable to remove the item', status: false })
    }
}