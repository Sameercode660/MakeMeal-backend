import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) { 
    try {
        
        const body = await req.json()

        const {status} = body

        const response = await prisma.complaint.findMany({
            where: {
                status
            },
            include: {
               user: true,
               order: true
            }
        })

        if(!response) {
            return NextResponse.json({statusCode: 200, response: [], message: 'No any complaint is found', status: true})
        }

        return NextResponse.json({statusCode: 200, response, status: true})

    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to fetch the data', status: false})
    }
}