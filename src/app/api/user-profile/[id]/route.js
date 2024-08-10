import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const getProductDatas = await prisma.Product.findMany({
      where: {
        user_id: id,
      },
      include: {
        image_urls: true,
        user: {
          select: {
            username: true,
            user_img: true,
            alamat: true,
          },
        },
      },
    });

    const getUserDatas = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
      select: {
        username: true,
        user_img: true,
        alamat: true,
      },
    });

    return NextResponse.json({
      message: "data user berhasil didapat",
      dataUser: getUserDatas,
      data: getProductDatas,
    });
  } catch (error) {
    return NextResponse.json({
        message: "terhadi kesalahan pada server, coba dilain waktu",
        errorMessage: error.message
    })
  }
  
}
