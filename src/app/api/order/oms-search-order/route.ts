import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { startDate, endDate, orderNumber, mobileNumber } = body;

    console.log(startDate, endDate, orderNumber, mobileNumber);

    // Check if either orderNumber or mobileNumber is provided
    if (!orderNumber && !mobileNumber) {
      const response = await prisma.order.findMany({
        where: {
            createdAt: {
                gte: new Date(startDate),
                lte: new Date(endDate)
            }
        }
      })

      return NextResponse.json({statusCode: 200, response, status: true})
    }

    // Validate date inputs
    if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
      return NextResponse.json({
        statusCode: 400,
        message: "Invalid date range",
        status: false,
      });
    }

    let response;

    if (orderNumber) {
      response = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
          status: "close",
          orderNumber: orderNumber,
        },
      });
    } else {
      response = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
          status: "close",
          user: {
            phoneNumber: mobileNumber,
          },
        },
      });
    }

    if (response.length === 0) {
      return NextResponse.json({
        statusCode: 404,
        message: "No order found",
        response: [],
        status: false,
      });
    }

    return NextResponse.json({ statusCode: 200, response, status: true });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 500,
      message: "Unable to fetch the data",
      status: false,
    });
  }
}
