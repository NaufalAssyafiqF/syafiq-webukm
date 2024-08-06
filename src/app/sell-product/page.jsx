"use client";
import FooterComponent from "@/components/FooterComponent";
import TopBarComponent from "@/components/TopBarComponent";
import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const SellPage = () => {
  const [files, setFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isProductAdded, setIsProductAdded] = useState(false)
  const [messageError, setMessageError] = useState("")

  const categories = [
    "Jasa",
    "Elektronik & Gadget",
    "Motor",
    "Mobil",
    "Fashion Pria",
    "Fashion Wanita",
    "Hobi & Olahraga",
    "Properti",
    "Perlengkapan Bayi & Anak",
  ];

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    maxFiles: 4,
  });

  

  const thumbs = files.map((file, index) => (
    <div key={file.name} className="w-24 h-24 bg-gray-200 rounded relative">
      <img
        src={URL.createObjectURL(file)}
        alt="preview"
        className="w-full h-full object-cover"
      />
      <button
        onClick={() => handleDeleteImage(index)}
        className="absolute bg-gray-200 px-1 rounded-sm top-2 right-2 text-xs text-red-500 hover:text-red-700"
      >
        X
      </button>
    </div>
  ));

  const handleDeleteImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("namaProduk", event.target.productName.value);
    formData.append("deskripsi", event.target.productDescription.value);
    formData.append("kondisi", event.target.productCondition.value);
    formData.append("harga", event.target.produkPrice.value);
    formData.append("kategori", selectedCategory);
    formData.append("token", sessionStorage.getItem("token"));
    files.forEach((file, index) => {
      formData.append(`image`, file);
    });

    try {
      setMessageError("")
      const response = await fetch("http://localhost:3000/api/sell-product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      
      // setMessageError(response.)

      const result = await response.json();
      console.log(result);
      if (result.isProductAdded) {
        setIsProductAdded(true)
      }else {
        setMessageError(result.message)
      }

      // Handle success response
    } catch (error) {
      setMessageError("terjadi kesalahan pada server seilahkan coba dilain waktu")
      // Handle error response
    }
  };

  return (
    <div className="bg-slate-100 w-full h-full">
      <TopBarComponent />
      <div className="w-[80vw] bg-white mx-auto mt-10 rounded p-10">
        <h1 className="text-xl font-semibold text-[#3C6EBC] mb-10">
          Jual Produk/Jasa Baru
        </h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="flex gap-x-9">
            <div className="w-[70%]">
              <label
                htmlFor="productName"
                className="block mb-2 text-sm font-medium"
              >
                Nama Poduk/jasa
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                required
              />
              <label
                htmlFor="productDescription"
                className="block mb-2 text-sm font-medium"
              >
                Deskripsi Produk/Jasa
              </label>
              <textarea
                name="productDescription"
                id="productDescription"
                rows="8"
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
              ></textarea>
              <label
                htmlFor="prouctCondition"
                className="block mb-2 text-sm font-medium"
              >
                Kondisi Produk/Jasa
              </label>
              <input
                type="text"
                name="productCondition"
                id="productCondition"
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                required
              />
              <label
                htmlFor="produkPrice"
                className="block mb-2 text-sm font-medium"
              >
                Harga Produk/Jasa
              </label>
              <input
                type="number"
                name="produkPrice"
                id="produkPrice"
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                required
              />
            </div>
            <div className="w-[30%] p-2 flex flex-col">
              <div>
                <label
                  htmlFor="uploadImage"
                  className="block mb-2 text-sm font-medium"
                >
                  Upload Gamabar Produk/Jasa
                </label>
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded-sm mb-4">
                  {files.length < 4 ? (
                    <div
                      {...getRootProps({
                        className:
                          "dropzone border-2 border-dashed border-gray-400 rounded-md p-6",
                      })}
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>drop file disini...</p>
                      ) : (
                        <p>
                          drag n drop file kamu atau{" "}
                          <span className="text-blue-500 cursor-pointer">
                            pilih disni
                          </span>{" "}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-400 rounded-md p-6">
                      Tidak bisa mengupload lebih dari 4 gambar
                    </div>
                  )}

                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {thumbs}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium"
                >
                  Kategori
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#2E5F9E] hover:bg-[#3974c2] text-white font-semibold py-2 px-6 rounded-lg mt-5"
          >
            Jual Porduk/Jasa
          </button>
        </form>
        {messageError ? <h1 className="text-red-600 mt-4">*{messageError}</h1>: null}
        {isProductAdded ? <h1 className="text-blue-600 mt-4">Produk berhasil ditambahkan ke list penjualan</h1> : null}
      </div>
      <FooterComponent />
    </div>
  );
};

export default SellPage;
