import { verifyToken } from "@/libs/jwt";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
const { Storage } = require("@google-cloud/storage");
const path = require("path");

export async function POST(request) {
  try {
    //mengambil data dari body formData
    const formData = await request.formData();
    // const dataImage = formData.get("image");
    const namaProduk = formData.get("namaProduk")
    const deskripsi = formData.get("deskripsi")
    const kondisi = formData.get("kondisi")
    const harga = formData.get("harga")
    const kategori = formData.get("kategori")
    const token = formData.get("token")

    const images = formData.getAll("image");

    // validasi jika image kosong
    if (images.length === 0) {
      return NextResponse.json({
        message: "gambar belum diupload",
        isProductAdded: false,
      });
    }
   
    
    // validasi token
    const verifikasiToken = verifyToken(token);
    if (!verifikasiToken) {
        return NextResponse.json({
          message: "token tidak valid",
          isProductAdded: false,
        });
    }
    
    const userId = verifikasiToken.id

    const dateid = Date.now().toString();
    const idProduk = `pr${dateid}`

    // meanmbah data product baru ke database
    await prisma.Product.create({
        data: {
            user_id: userId,
            name_product: namaProduk,
            price_product: parseFloat(harga),
            description_product: deskripsi,
            condition: kondisi,
            category: kategori,
            product_id: idProduk
        }
    })

    //set up cloud storage dengan key json file
    // const storage = new Storage({
    //   projectId: "web-ukm-427815",
    //   keyFilename: path.join(process.cwd(), "public/gcp-key/key-cloudstorage.json"),
    // });

    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
    });

    //menghubungkan ke folder cloud storage
    const bucketName = "goritmix-web-ukm";
    const folderName = "product-images";
    // const imageUrls = [];
    const dateName = Date.now().toString();

    for (const dataImage of images) {
        const originalFileName = dataImage.name;
        const sanitizedFileName = originalFileName.replace(/\s+/g, "_"); //handle jika nama terdapat spasi

        //membuat nama file
        const bucket = storage.bucket(bucketName);
        const filename = `${folderName}/${dateName}-${sanitizedFileName}`;
        const fileUpload = bucket.file(filename);

        const buffer = Buffer.from(await dataImage.arrayBuffer());
        const mimeType = dataImage.type;

        //upload image
        await fileUpload.save(buffer, {
          contentType: mimeType,
          metadata: {
            cacheControl: "public, max-age=31536000",
          },
        });

        const imageUrl = `https://storage.cloud.google.com/goritmix-web-ukm/product-images/${dateName}-${sanitizedFileName}`;
        const dateImage = Date.now().toString();
        const imageId = `imgpr${dateImage}`;

        //menambah data table imageproduct
        await prisma.imageUrl.create({
          data: {
            image_id: imageId,
            product_id: idProduk,
            image_url: imageUrl,
          },
        });
    }


    return NextResponse.json({
      message: "produk berhasil ditambahkan",
      isProductAdded: true
    //   urlImg: imageUrl,
    //   decodeToken: verifikasiToken
    });
    
  } catch (error) {
    return NextResponse.json({
      message: "produk gagal ditambahkan",
      errorMessage: error.message,
      isProductAdded: false,
    });
  }
}

