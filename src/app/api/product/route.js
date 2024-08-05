import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const data = await request.json();
        const { id } = data;

        const dataProduct = await prisma.products.findUnique({
          where: { product_id: id },
        });
        console.log(dataProduct);

        if(!dataProduct) {
            return NextResponse.json({
                message: "data product tidak ditemukan",
            });
        }

        const dataProductImage = await prisma.image_urls.findUnique({
          where: { product_id: id },
        });
        console.log(dataProductImage);

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