import { NextResponse } from "next/server";

export async function GET(request) {
//   const searchParams = request.nextUrl.searchParams;
//   const query = searchParams.get("categories");

  try {
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
      data: getProductDatas,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
