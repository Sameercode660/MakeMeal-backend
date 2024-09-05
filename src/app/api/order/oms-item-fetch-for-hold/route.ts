import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextResponse) {
    try {
        const response = await prisma.product.findMany({})

        if(!response) {
            return NextResponse.json({statusCode: 404, message: 'No item is available', status: false})
        }

        return NextResponse.json({statusCode: 200, response, message: 'fetched data successfully', status: true})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to fetch the data', status: false})
    }
}