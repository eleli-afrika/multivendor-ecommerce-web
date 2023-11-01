import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosService } from "../Redux/helpers/axios";
import { fetchCategories } from "../Redux/hooks/categories.actions";
import { useSelector } from "react-redux";

const SearchBar: React.FC = () => {
  const [category, setCategory] = useState<string>("all");
  const [subcategory, setSubcategory] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("0");
  const [maxPrice, setMaxPrice] = useState<string>("100000000");
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { open } = useSelector((state: any) => state.opener);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "all") {
      // Handle the case when "all" is selected, clear subcategories.
      setSubcategory("all");
      setSubcategories([]);
    } else {
      // Fetch subcategories based on the selected category
      setIsLoading(true);
      axiosService
        .get(`/subcategories/getsubcategories/${selectedCategory}`)
        .then((response) => {
          const subcategories = response.data.Data;
          setSubcategories(subcategories);
          setSubcategory("all");
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    setIsLoading(true);
    fetchCategories()
      .then((response) => {
        setCategories(response.data.Data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = () => {
    // Add your search functionality here
  };

  return (
    <>
      <div className=" hidden h- md:flex items-center gap-10 shadow-custom p-3 bg-primary-orange w-screen">
        <button
          className="p-2 bg-white rounded w-[200px]"
          onClick={() => navigate("/ads")}
        >
          View All
        </button>

        <select
          id="categorySelect"
          value={category}
          onChange={handleCategoryChange}
          className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom"
        >
          <option value="all">Select Category</option>
          {categories.map((category) => (
            <option key={category.categoryid} value={category.categoryname}>
              {category.categoryname}
            </option>
          ))}
        </select>

        <select
          id="subcategorySelect"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom"
        >
          <option value="all">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option
              key={subcategory.subcategoryid}
              value={subcategory.subcategoryname}
            >
              {subcategory.subcategoryname}
            </option>
          ))}
        </select>

        <select
          id="minPriceSelect"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom"
        >
          <option value="0">Select Min Price:</option>
          <option value="200">200</option>
          <option value="400">400</option>
        </select>

        <select
          id="maxPriceSelect"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom cursor-pointer"
        >
          <option value="100000000">Select Max Price:</option>
          <option value="100000000">100,000,000</option>
          <option value="200000000">200,000,000</option>
        </select>

        <select
          id="brand"
          onChange={(e) => setMaxPrice(e.target.value)} // Note: This line might need to be corrected to handle the brand selection
          className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom"
        >
          <option value="All">Select Brand:</option>
          <option value="Innovia">Innovia</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-black text-white p-2 rounded hover:bg-secondary-orange transition-colors delay-300 w-[250px] outline-none shadow-custom"
        >
          Search
        </button>
      </div>

      {/* for smaller devices */}

      {open && (
        <div
          className="sm:hidden search flex-col flex-wrap gap-2 shadow-custom p-3 bg-primary-orange w-screen  pl-4"
          style={{ display: "flex" }}
        >
          <button
            className="p-2 bg-white rounded w-[200px]"
            onClick={() => navigate("/ads")}
          >
            View All
          </button>

          <select
            id="categorySelect"
            value={category}
            onChange={handleCategoryChange}
            className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom"
          >
            <option value="all">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryid} value={category.categoryname}>
                {category.categoryname}
              </option>
            ))}
          </select>

          <select
            id="subcategorySelect"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom"
          >
            <option value="all">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option
                key={subcategory.subcategoryid}
                value={subcategory.subcategoryname}
              >
                {subcategory.subcategoryname}
              </option>
            ))}
          </select>

          <select
            id="minPriceSelect"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom"
          >
            <option value="0">Select Min Price:</option>
            <option value="200">200</option>
            <option value="400">400</option>
          </select>

          <select
            id="maxPriceSelect"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom"
          >
            <option value="100000000">Select Max Price:</option>
            <option value="100000000">100,000,000</option>
            <option value="200000000">200,000,000</option>
          </select>

          <select
            id="brand"
            onChange={(e) => setMaxPrice(e.target.value)} // Note: This line might need to be corrected to handle the brand selection
            className="p-2 border rounded w-[200px] bg-white outline-none shadow-custom"
          >
            <option value="All">Select Brand:</option>
            <option value="Innovia">Innovia</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-black text-white p-2 rounded hover-bg-secondary-orange transition-colors delay-300 w-[250px] outline-none shadow-custom"
          >
            Search
          </button>
        </div>
      )}
    </>
  );
};

export default SearchBar;
