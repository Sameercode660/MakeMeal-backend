import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { startDate, endDate } = body;

    const response: any = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        status: "close",
      },
    });

    const arrayOfItems = response.map((order: any) =>  order.items)

    const flatArray = arrayOfItems.flat()

    const totalPrice = flatArray.reduce((accum: any, order: any) => (accum + order.price),0)
    const quantity = flatArray.reduce((accum: any, order: any) => (accum + order.quantity),0)

    return NextResponse.json({statusCode: 200, flatArray, totalPrice, quantity, status: true})
  } catch (error) {
    console.log(error);
  }
}
