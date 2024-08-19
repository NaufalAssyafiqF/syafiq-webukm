"use client";
import React, { useState, useEffect } from "react";

const ProductFilter = ({ selectedCategories, onCategoryChange }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Mobil" },
    { id: 2, name: "Fashion Pria" },
  ]);

  useEffect(() => {
    // Logic untuk mengambil data kategori dari API jika diperlukan
  }, []);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    onCategoryChange(value, checked);
  };

  return (
    <div className="flex flex-col space-y-4">
      {categories.map((category) => (
        <div key={category.id}>
          <input
            type="checkbox"
            id={`category-${category.id}`}
            value={category.id}
            checked={selectedCategories.includes(category.id)}
            onChange={handleCategoryChange}
          />
          <label htmlFor={`category-${category.id}`}>{category.name}</label>
        </div>
      ))}
    </div>
  );
};

export default ProductFilter;
