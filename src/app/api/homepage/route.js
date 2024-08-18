import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    try {
      // mengambil semua data product
       const getProductDatas = await prisma.Product.findMany({
         include: {
           image_urls: true,
           user: {
             select: {
               username: true,
               user_img: true,
               alamat: true,
               kota: true,
             },
           },
         },
       });

       return NextResponse.json({
         message: "data produk berhasil didapat",
         data: getProductDatas
       }); 
    } catch (error) {
        return NextResponse.json({
            messageError: error.message
        })
    }
}