import { NextResponse } from "next/server";
import { IoGameController } from "react-icons/io5";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    // mengambil semua data produk berdasarkan id
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
            kota: true,
            kota: true,
          },
        },
      },
    });

    // mengambil data user berdasarkan id
    const getUserDatas = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
      select: {
        username: true,
        user_img: true,
        alamat: true,
        kota: true,
        deskripsi: true,
        fb_link: true,
        ig_link: true,
        phone_number: true,
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
