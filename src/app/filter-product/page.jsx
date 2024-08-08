"use client";
import CardProduct from "@/components/HomeComponents/CardProduct";
import TopBarComponent from "@/components/TopBarComponent";
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
    // Fetch data produk
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/filter-product");
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

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
    <div className="w-full h-full bg-slate-200">
      <TopBarComponent />
      <div className="flex ">
        <div className="w-[25%] h-[100vh] sticky top-0">
          <div className="w-[90%] mx-auto p-4 bg-white mt-5 rounded shadow-md">
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
        <div className="w-[75%] grid gap-3 grid-cols-3 grid-rows-3 mt-5">
          {filteredProducts?.map((product, index) => (
            <CardProduct key={index} dataProduk={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
