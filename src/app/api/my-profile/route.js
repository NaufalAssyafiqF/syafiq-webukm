import { verifyToken } from "@/libs/jwt";
import prisma from "@/libs/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const authHeader = headers().get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized", isTokenVerified: false },{
      status: 401
    });
  }
  try {
    // mengambil token & verifikasi token
    const token = authHeader.split(" ")[1];
    const isTokenVerified = verifyToken(token);
    
    // mengambil data product dari database berdasarkan user_id
    const getProductDatas = await prisma.Product.findMany({
      where: {
        user_id: isTokenVerified.id,
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

    // mengambil data user dari database berdasarkan user_id
    const getUserDatas = await prisma.user.findUnique({
      where: {
        user_id: isTokenVerified.id,
      },
      select: {
        user_id: true,
        username: true,
        user_img: true,
        alamat: true,
        kota: true,
        deskripsi: true,
        fb_link: true,
        ig_link: true,
        wa_link: true,
        phone_number: true,
      },
    });

    return NextResponse.json({
      message: "data user berhasil didapat",
      dataUser: getUserDatas,
      data: getProductDatas,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "terjadi kesalahan pada server, coba dilain waktu",
        errorMessage: error.message,
      },
      {
        status: 500,
      }
    );
  }
  
}
