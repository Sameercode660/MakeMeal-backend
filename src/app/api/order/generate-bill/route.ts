import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { orderId } = body;

    const response: any = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });
    /**************************************************************** */
    const doc = new jsPDF();

    doc.setFontSize(30);
    doc.setFont("helvetica", "bold");
    
    doc.text("Make Meal", 40, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    doc.text(`Order Number: ${response?.orderNumber}`, 45, 30);
    
    
    doc.text(`-------------------------------------------------------------------------------------`, 10, 33);
    
    doc.setFont("helvetica", "bold");
    doc.text("Item", 10, 40)
    doc.text("Qty.", 60, 40)
    doc.text("Amt.", 110, 40)
    doc.setFont("helvetica", "normal");
    
    let currentIndex = 0;
    
    response.items.map((item: any, index: any ) => {
        doc.text(item.name.length > 20 ? item.name.slice(0, 20) + '..' : item.name, 10, 46 + index * 5)
        doc.text(`${item.quantity}`, 60, 46 + index * 5)
        doc.text(`${item.price}`, 110, 46 + index * 5)
        
        currentIndex = 46 + index * 5
    })
    
    console.log(currentIndex)
    doc.text(`-------------------------------------------------------------------------------------`, 10, currentIndex + 5 );
    
    doc.text(`Total Price: ${response?.totalPrice}`, 45, currentIndex + 10);
    
    doc.text(`-------------------------------------------------------------------------------------`, 10, currentIndex + 15 );
    
    doc.text('Thanks for Ordering with us', 40, currentIndex + 20);

    doc.setFont('helvetica', 'italic')

    doc.text(' Please are your feedback', 40, currentIndex + 25);
    
    doc.setFont('helvetica', 'normal')

    const buffer = Buffer.from(doc.output("arraybuffer"));
    
    /**************************************************************** */

    const pdfResponse = new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="sample.pdf"',
      },
    });

    return pdfResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      statusCode: 500,
      message: "Unable to generate the bill",
      status: false,
    });
  }
}
