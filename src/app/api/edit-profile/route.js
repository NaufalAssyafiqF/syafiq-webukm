import { verifyToken } from "@/libs/jwt";
import prisma from "@/libs/prisma";
import { Storage } from "@google-cloud/storage";
import { log } from "console";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const path = require("path");

export async function GET(request) {
  const authHeader = headers().get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized", isTokenVerified: false });
  }

  try {
    const token = authHeader.split(" ")[1];
    const isTokenVerified = verifyToken(token);

    const getUserDatas = await prisma.user.findUnique({
      where: {
        user_id: isTokenVerified.id,
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

    return NextResponse.json({ data: getUserDatas, isTokenVerified: true });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      isTokenVerified: false,
    });
  }
}

export async function PUT(request) {
  const authHeader = headers().get("Authorization");
  const token = authHeader.split(" ")[1];

  //mengambil data dari body formData
  const formData = await request.formData();
  const username = formData.get("username");
  const deskripsi = formData.get("deskripsi");
  const kondisi = formData.get("alamat");
  const harga = formData.get("kota");
  const kategori = formData.get("phoneNumber");

  const instagram = formData.get("ig_link");
  const facebook = formData.get("fb_link");
  const whatsapp = formData.get("wa_link");

  const image = formData.get("image");

  console.log(image);

  console.log({
    username: username,
    deskripsi: deskripsi,
    kondisi: kondisi,
    harga: harga,
    kategori: kategori,
    instagram: instagram,
    facebook: facebook,
    whatsapp: whatsapp,
  });

  try {
    //validasi-validasi
    const verifikasiToken = verifyToken(token);
    if (!verifikasiToken) {
      return NextResponse.json({
        message: "token tidak valid",
        isUpdated: false,
      });
    }
    console.log({ token: verifikasiToken });

    const userId = verifikasiToken.id;

    let imageUrl = image;

    if (image !== verifikasiToken.image) {
        console.log(image);
        console.log(verifikasiToken.image);
        
        
      //set up cloud storage dengan key json file
      const storage = new Storage({
        projectId: "web-ukm-427815",
        keyFilename: path.join(
          process.cwd(),
          "public/gcp-key/key-cloudstorage.json"
        ),
      });

      //menghubungkan ke folder cloud storage
      const bucketName = "goritmix-web-ukm";
      const folderName = "user-images";
      // const imageUrls = [];
      const dateName = Date.now().toString();

      const originalFileName = image.name;
      const sanitizedFileName = originalFileName.replace(/\s+/g, "_"); //handle jika nama terdapat spasi

      const bucket = storage.bucket(bucketName);
      const filename = `${folderName}/usr${dateName}-${sanitizedFileName}`;
      const fileUpload = bucket.file(filename);
      const buffer = Buffer.from(await image.arrayBuffer());
      const mimeType = image.type;

      await fileUpload.save(buffer, {
        contentType: mimeType,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });

      imageUrl = `https://storage.cloud.google.com/goritmix-web-ukm/user-images/usr${dateName}-${sanitizedFileName}`;
    }

    await prisma.user.update({
      where: { user_id: userId },
      data: {
        username: username,
        user_img: imageUrl,
        deskripsi: deskripsi,
        alamat: kondisi,
        kota: harga,
        phone_number: kategori,
        fb_link: facebook,
        ig_link: instagram,
        wa_link: whatsapp,
      },
    });

    return NextResponse.json({
      message: "Profile berhasil diupdate",
      isUpdated: true,
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return NextResponse.json({
      message: "profile gagal diupdate",
      errorMessage: error.message,
      isUpdated: false,
    });
  }
}
