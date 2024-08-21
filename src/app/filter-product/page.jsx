"use client";
import FooterComponent from "@/components/FooterComponent";
import CardProduct from "@/components/HomeComponents/CardProduct";
import TopBarComponent from "@/components/TopBarComponent";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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

  useEffect(() => {
    // Ambil kategori yang disimpan di sessionStorage
    const initialCategory = sessionStorage.getItem("filterProduct");
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }

    const fetchData = async () => {
      const response = await axios.get("/api/filter-product", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      setProducts(result);
    };
    fetchData();
  }, []);

  // handle untuk meruabh kategori
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const filteredProducts = selectedCategories.length
    ? products.data?.filter((product) =>
        selectedCategories.includes(product.category)
      )
    : products.data;

  return (
    <div className="w-full h-full bg-slate-200 ">
      <TopBarComponent />
      <div className="flex mx-10">
        <div className="w-[25%] h-[100vh] sticky top-0">
          <div className="w-[90%] p-4 bg-white mt-5 rounded shadow-md">
            <h1 className="text-lg font-semibold text-blue-600 mb-2">
              Kategori
            </h1>
            {categories.map((category, index) => (
              <div key={index} class="flex items-center mb-4">
                <input
                  id={`category-${index}`}
                  type="checkbox"
                  value={category}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                <label
                  for={`category-${index}`}
                  class="ms-2 text-sm font-medium text-gray-900"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[75%] grid gap-3 grid-cols-3 grid-rows-3 mt-5 bg-white p-4 rounded">
          {filteredProducts?.map((product, index) => (
            <CardProduct key={index} dataProduk={product} />
          ))}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Products;
