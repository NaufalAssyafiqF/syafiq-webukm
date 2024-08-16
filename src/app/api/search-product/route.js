import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("search");

  try {
    const getProductDatas = await prisma.Product.findMany({
      where: {
        name_product: {
          search: query,
        },
      },
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

    if (getProductDatas.length === 0) {
      return NextResponse.json({
        message: "data produk tidak ditemukan",
        isSearched: false,
      });
    }

    return NextResponse.json({
      message: "data produk berhasil didapat",
      isSearched: true,
      data: getProductDatas,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, isSearched: false });
  }
}
