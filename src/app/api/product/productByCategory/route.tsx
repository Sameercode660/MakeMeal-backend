import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {category} = body

        const response = await prisma.product.findMany({
            where: {
                category
            }
        })

        if(!response) {
            return NextResponse.json({statusCode: 404, message: "Category not found", status: false})
        }

        return NextResponse.json({statusCode: 200, response, status: true})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to fetch the data', status: false})
    }
}