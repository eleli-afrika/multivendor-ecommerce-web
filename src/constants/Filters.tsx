const Filters = () => {
  const categoryOptions = [
    "Electronics",
    "Clothing",
    "Furniture",
    "Automobile",
    // Add more category options
  ];


  const budgetOptions = [
    "Kshs  100 -  200",
    "Kshs  200 -   300",
    "Kshs  300 -   400",
    "Kshs  400 -   500",
    "Kshs  500 -   600",
    "Kshs  600 -   700",
    "Kshs  700 -   800",
    "Kshs  800 -   900",
    "Kshs  900 -  1,000",
  ];

  const brandOptions = [
    "Apple",
    "Samsung",
    "Sony",
    "Nike",
    "Adidas",
    "IKEA",
    // Add more brand options
  ];

  return (
    <div className="flex flex-col space-y-4 bg-gray-light mt-5 my-other-sidebar rounded ">
      {/* Filter By Category */}
      <div className=" p-4 ">
        <button className="px-3 py-1 bg-secondary-orange text-white cursor-pointer rounded mb-2">
          Filter by Category
        </button>
        <div className="scrollable-list">
          <ul className="space-y-2">
            {categoryOptions.map((option, index) => (
              <li key={index} className="">
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Filter by Subcategory */}
      {/* <div className="bg-gray-100 p-4">
        <button >Filter by Subcategory</button>
        <div className="scrollable-list">
          <ul className="space-y-2">
            {subcategoryOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Filter by Budget */}
      <div className="p-4 ">
        <button className="px-3 py-1 bg-secondary-orange text-white cursor-pointer rounded mb-2">
          Filter by Budget
        </button>
        <div className="scrollable-list">
          <ul className="space-y-2">
            {budgetOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Filter by Brands */}
      <div className=" p-4 ">
        <button className="px-3 py-1 bg-secondary-orange text-white cursor-pointer rounded mb-2">
          Filter by Brand
        </button>
        <div className="scrollable-list">
          <ul className="space-y-2">
            {brandOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filters;
