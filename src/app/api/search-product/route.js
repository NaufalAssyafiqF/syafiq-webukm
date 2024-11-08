import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("search");

  try {
    // mengambil semua data product berdasarkan query search
    const getProductDatas = await prisma.Product.findMany({
      where: {
        name_product: {
          contains: query,
          mode: "insensitive",
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

    // validasi jika data product tidak ditemukan
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
