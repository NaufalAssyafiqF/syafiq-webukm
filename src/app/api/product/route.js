import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const data = await request.json();
        const { id } = data;

        // mengambil data product dari database berdasarkan id
        const dataProduct = await prisma.products.findUnique({
          where: { product_id: id },
        });

        // validasi jika produk tdak ditemukan
        if(!dataProduct) {
            return NextResponse.json({
                message: "data product tidak ditemukan",
            });
        }

        // mengambil data image product
        const dataProductImage = await prisma.image_urls.findUnique({
          where: { product_id: id },
        });

        return NextResponse.json({
            message: "data product berhasil didapat",
            data: dataProduct,
            img: dataProductImage
        });

    } catch (error) {
        return NextResponse.json({
            message: "terhadi kesalahan pada server, coba dilain waktu",
            errorMessage: error.message
        })
    }
}