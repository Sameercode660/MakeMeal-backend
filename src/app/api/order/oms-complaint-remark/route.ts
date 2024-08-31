import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json()

        const {complaintId, userId, orderId, remark} = body

        if(!complaintId || !userId || !orderId || !remark) {
            return NextResponse.json({statusCode: 404, message: 'Any one field is empty', status: true})
        }
        console.log(orderId)
        const response = await prisma.remark.create({
            data: {
                complaintId, 
                userId,
                orderId,
                remark
            }
        })

        const complaintClosed = await prisma.complaint.update({
            where: {
                id: complaintId
            }, 
            data: {
                status: 'CLOSED'
            }
        })

        if(!response) {
            return NextResponse.json({satusCode: 500, message: 'Unable to create the remark', status: false})
        }

        return NextResponse.json({statusCode: 200, response, complaintClosed, status: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({statusCode: 500, message: 'Unable to close the complaint', status: false})
    }
}