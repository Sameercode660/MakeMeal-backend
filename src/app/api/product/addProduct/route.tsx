import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const response = await prisma.product.createMany({
            data: body
        })

        return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return NextResponse.json(({statusCode: 500, message: 'Unable to add product in db', status: false}))
    }

}