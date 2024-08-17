"use client";
import FooterComponent from "@/components/FooterComponent";
import TopBarComponent from "@/components/TopBarComponent";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const EditProfilePage = () => {
  const [file, setFile] = useState();
  const [getData, setGetData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [image, setImage] = useState(
    "https://storage.cloud.google.com/goritmix-web-ukm/user-images/defaultavatar1.jpg"
  );
  const [messageError, setMessageError] = useState("");

  const [valueField, setValueField] = useState({
    username: "",
    deskripsi: "",
    alamat: "",
    kota: "",
    phoneNumber: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
  });

  const token = sessionStorage.getItem("token");

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
    maxSize: 20 * 1024 * 1024, // Batas maksimal 5 MB
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", event.target.username.value);
    formData.append(
      "deskripsi",
      event.target.deskripsi.value
    );
    formData.append("alamat", event.target.alamat.value);
    formData.append("kota", event.target.kota.value);
    formData.append("phoneNumber", event.target.phoneNumber.value);
    formData.append("fb_link", event.target.facebook.value);
    formData.append("ig_link", event.target.instagram.value);
    formData.append("wa_link", event.target.whatsapp.value);
    formData.append("image", file);

    try {
      setMessageError("");
      const response = await fetch("http://localhost:3000/api/edit-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // setMessageError(response.)

      const result = await response.json();
      if (result.isUpdated) {
        setIsUpdated(true);
        sessionStorage.setItem("token", result.token);
      } else {
        setMessageError(result.message);
      }

      // Handle success response
    } catch (error) {
      setMessageError(
        "terjadi kesalahan pada server seilahkan coba dilain waktu"
      );
      // Handle error response
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValueField({
      ...valueField,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return;
      }
      const response = await fetch("/api/edit-profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setGetData(result.data);
        setFile(result.data?.user_img);
        setImage(result.data?.user_img);

        setValueField({
          username: result.data?.username || "",
          deskripsi: result.data?.deskripsi || "",
          alamat: result.data?.alamat || "",
          kota: result.data?.kota || "",
          phoneNumber: result.data?.phone_number || "",
          instagram: result.data?.ig_link || "",
          facebook: result.data?.fb_link || "",
          whatsapp: result.data?.wa_link || "",
        });
      } else {
        console.error("gagal mengambil data pengguna");
      }
    };

    fetchData();
  }, []);

  if (!getData) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <span class="loader"></span>
      </div>
    ); // atau Anda bisa menampilkan spinner/loading indicator
  }

  return (
    <div className="bg-slate-100 w-full h-full">
      <TopBarComponent />
      <div className="w-[80vw] bg-white mx-auto mt-10 rounded p-10">
        <h1 className="text-xl font-semibold text-[#3C6EBC] mb-10">
          Update Profile
        </h1>
        <form className="" onSubmit={handleSubmit}>
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
                value={valueField.username}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                required
              />
              <label
                htmlFor="deskripsi"
                className="block mb-2 text-sm font-medium"
              >
                Deskripsi Profile
              </label>
              <textarea
                name="deskripsi"
                id="deskripsi"
                rows="10"
                value={valueField.deskripsi}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
              ></textarea>
              <label
                htmlFor="alamat"
                className="block mb-2 text-sm font-medium"
              >
                Alamat
              </label>
              <input
                type="text"
                name="alamat"
                id="alamat"
                value={valueField.alamat}
                onChange={handleInputChange}
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
                  htmlFor="kota"
                  className="block mb-2 text-sm font-medium"
                >
                  Kota
                </label>
                <input
                  type="text"
                  name="kota"
                  id="kota"
                  value={valueField.kota}
                  onChange={handleInputChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
                  required
                />
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium"
                >
                  No Telpon Genggam
                </label>
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={valueField.phoneNumber}
                  onChange={handleInputChange}
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
              instagram
            </label>
            <input
              type="text"
              name="instagram"
              id="instagram"
              value={valueField.instagram}
              onChange={handleInputChange}
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
              value={valueField.facebook}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-6"
            />
            <label
              htmlFor="whatsapp"
              className="block mb-2 text-sm font-medium"
            >
              No HP terhubung whatsapp
            </label>
            <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              value={valueField.whatsapp}
              onChange={handleInputChange}
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
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </form>
        {messageError ? (
          <h1 className="text-red-600 mt-4">*{messageError}</h1>
        ) : null}
        {isUpdated ? (
          <h1 className="text-blue-600 mt-4">Pofile Berhasil Diupdate</h1>
        ) : null}
      </div>
      <FooterComponent />
    </div>
  );
};

export default EditProfilePage;
