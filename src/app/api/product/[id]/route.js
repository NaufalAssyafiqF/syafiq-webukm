//

import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params; // Ambil ID produk dari URL

    const dataProduct = await prisma.product.findUnique({
      where: { product_id: id },
    });

    if (!dataProduct) {
      return NextResponse.json(
        { errorMessage: "produk tidak ditemukan" },
        { status: 404 }
      );
    }

    const dataProductImage = await prisma.imageUrl.findMany({
      where: { product_id: id },
    });

    const dataUser = await prisma.user.findUnique({
      where: { user_id: dataProduct.user_id },
      select: {
        user_id: true,
        username: true,
        user_img: true,
        alamat: true,
        kota: true,
      },
    });

    return NextResponse.json({
      message: "Data product berhasil didapat",
      data: dataProduct,
      imgUrl: dataProductImage,
      dataUser: dataUser,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { errorMessage: "An error occurred on the server", error: error.message },
      { status: 500 }
    );
  }
}
