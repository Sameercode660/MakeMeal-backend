import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextResponse) {
    try {
        const body = await req.json()

        const {userId, orderId, title, description, category} = body

        if(!userId || !orderId || !title || !description || !category) {
            return NextResponse.json({statusCode: 406, message: 'Inputs are not acceptable', status: false})
        }

        const response = await prisma.complaint.create({
            data: {
                userId,
                orderId,
                title, 
                description, 
                category
            }
        })

        if(!response) {
            return NextResponse.json({satusCode: 400, message: 'Something went wrong', status: false})
        }

        return NextResponse.json({statusCode: 200, response, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to post the complaint', status: false})
    }
}