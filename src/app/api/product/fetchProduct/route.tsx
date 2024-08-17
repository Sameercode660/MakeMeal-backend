import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function GET(req: NextRequest) {
    try {
        const response = await prisma.product.findMany({})
        
        return NextResponse.json({statusCode: 200, response, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to fetch the data', status: false})
    }
}