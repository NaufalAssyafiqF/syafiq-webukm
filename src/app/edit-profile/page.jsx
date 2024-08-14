"use client";
import FooterComponent from "@/components/FooterComponent";
import TopBarComponent from "@/components/TopBarComponent";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const EditProfilePage = () => {
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(
    "https://storage.cloud.google.com/goritmix-web-ukm/user-images/defaultavatar1.jpg"
  );
  const [messageError, setMessageError] = useState("");

  const onDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];

    if (uploadedFile && uploadedFile.size <= 20 * 1024 * 1024) {
      setFile(uploadedFile);
      setImage(URL.createObjectURL(uploadedFile)); // Update tampilan dengan gambar baru
    } else {
      alert("File terlalu besar, maksimal ukuran file adalah 5 MB");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5 * 1024 * 1024, // Batas maksimal 5 MB
  });

  
  return (
    <div className="bg-slate-100 w-full h-full">
      <TopBarComponent />
      <div className="w-[80vw] bg-white mx-auto mt-10 rounded p-10">
        <h1 className="text-xl font-semibold text-[#3C6EBC] mb-10">
          Update Profile
        </h1>
        <form className="" onSubmit="">
          <div className="flex gap-x-9">
            <div className="w-[70%]">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                required
              />
              <label
                htmlFor="profileDescription"
                className="block mb-2 text-sm font-medium"
              >
                Deskripsi Profile
              </label>
              <textarea
                name="profileDescription"
                id="profileDescription"
                rows="10"
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
              ></textarea>
              <label
                htmlFor="adress"
                className="block mb-2 text-sm font-medium"
              >
                Alamat
              </label>
              <input
                type="text"
                name="adress"
                id="adress"
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                required
              />
            </div>
            <div className="w-[30%] pt-2 px-2 flex flex-col justify-between">
              <label
                htmlFor="adress"
                className="block mb-2 text-sm font-medium"
              >
                Update Gambar Profile
              </label>
              <div className="flex flex-col items-center">
                <div
                  {...getRootProps()}
                  className="w-48 h-48 border-2 border-gray-300 rounded-lg flex justify-center items-center cursor-pointer mb-4 overflow-hidden"
                >
                  <input {...getInputProps()} />
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-500 text-center">
                      Drag & drop your profile image here, or click to select
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium"
                >
                  Kota
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                  required
                />
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium"
                >
                  No Telpon Genggam
                </label>
                <input
                  type="number"
                  name="city"
                  id="city"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-[#3C6EBC] text-lg font-semibold mb-4">
              Link Sosial Media
            </h1>
            <label
              htmlFor="instagram"
              className="block mb-2 text-sm font-medium"
            >
              Instagram
            </label>
            <input
              type="text"
              name="instagram"
              id="instagram"
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
            />
            <label
              htmlFor="facebook"
              className="block mb-2 text-sm font-medium"
            >
              Facebook
            </label>
            <input
              type="text"
              name="facebook"
              id="facebook"
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
            />
            <label htmlFor="city" className="block mb-2 text-sm font-medium">
              No terhubung Whatsapp
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#2E5F9E] hover:bg-[#3974c2] text-white font-semibold py-2 px-6 rounded-lg mt-5 ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Jual Produk/Jasa"}
          </button>
        </form>
        {/* {messageError ? (
          <h1 className="text-red-600 mt-4">*{messageError}</h1>
        ) : null}
        {isProductAdded ? (
          <h1 className="text-blue-600 mt-4">
            Produk berhasil ditambahkan ke list penjualan
          </h1>
        ) : null} */}
      </div>
      <FooterComponent />
    </div>
  );
};

export default EditProfilePage;
