import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RequestArgumentTypes {
  userId: string;
  productId: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { userId, productId, quantity }: RequestArgumentTypes = body;

  console.log(body);
  try {
    const existingProduct = await prisma.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingProduct) {
      const product = await prisma.product.findFirst({
        where: {
          productId,
        },
      });

      if(!product) {
        return NextResponse.json({statusCode: 400, message: 'Product is not available', status: false})
      }

      await prisma.cart.update({
        where: {
          id: existingProduct.id,
        },
        data: {
          amount: existingProduct.amount + (quantity * product?.price),
          quantity: existingProduct.quantity + (quantity),
        },
      });

      const response = await prisma.cart.findFirst({
        where: {
          id: existingProduct.id,
        },
      });
      return NextResponse.json({ statusCode: 200, response, status: true });
    } else {
      const product = await prisma.product.findFirst({
        where: {
          productId,
        },
      });

      if(!product) {
        return NextResponse.json({statusCode: 400, message: 'Product is not available', status: false})
      }

      const response = await prisma.cart.create({
        data: {
          productId,
          userId,
          quantity,
          amount: product?.price * quantity,
        },
      });

      return NextResponse.json({ statusCode: 200, response, status: true });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 500,
      message: "Unable to add item/update",
      status: false,
    });
  }
}
