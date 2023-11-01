import { useRef, useEffect, useState } from "react";
import { Categories } from "../../data/categories";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Category } from "@mui/icons-material";
import Cart from "../../assets/shopping.jpg";

function AnotherSlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null); // Explicitly specify the type
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideLeft = () => {
    const slider = sliderRef.current;
    if (slider) {
      const firstChild = slider.firstElementChild as HTMLElement;
      const itemWidth = firstChild.offsetWidth + 24; // Adjust 16 to match your margin or padding
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + Categories.length) % Categories.length
      );
      slider.scrollLeft -= itemWidth;
    }
  };

  const slideRight = () => {
    const slider = sliderRef.current;
    if (slider) {
      const firstChild = slider.firstElementChild as HTMLElement;
      const itemWidth = firstChild.offsetWidth + 24; // Adjust 16 to match your margin or padding
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Categories.length);
      slider.scrollLeft += itemWidth;
    }
  };

  const autoSlide = () => {
    slideRight();
  };

  useEffect(() => {
    // Automatically slide every 2 seconds
    const intervalId = setInterval(autoSlide, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Clone categories to create the effect of an infinite loop
  const clonedCategories = [
    ...Categories,
    ...Categories,
    ...Categories,   
  ];

  return (
    <div className="relative flex items-center mt-3">
      <MdChevronLeft
        className="opacity-50 cursor-pointer hover:opacity-100"
        onClick={slideLeft}
        size={40}
      />
      <div
        ref={sliderRef}
        className="w-full h-full overflow-hidden whitespace-nowrap scroll-smooth scrollbar-hide"
        style={{
          display: "flex",
        }}
      >
        {clonedCategories.map((item, index) => (
          <div
          key={index}
          className="relative text-gray-400 rounded shadow-custom gap-3 w-40 text-center"
          style={{
            flex: "0 0 auto",
            margin: "0 8px", // Add margin
            backgroundColor: "#2c3e50",
            display:
              index >= currentIndex &&
              index < currentIndex + Categories.length
                ? "block"
                : "none",
          }}
        >
          <img
            src={Cart} // Replace this with your cart image
            alt="Cart"
            className="w-full h-full rounded" // Adjust image size
          />
          <div className="absolute top-0 left-0 w-full h-full rounded" style={{    backgroundColor: "rgba(0,0,0,0.7)",}}>
            <Category />
            <p className="text-sm truncate text-white">{item.name}</p>
          </div>
        </div>
       
        ))}
      </div>
      <MdChevronRight
        className="opacity-50 cursor-pointer hover:opacity-100"
        onClick={slideRight}
        size={40}
      />
    </div>
  );
}

export default AnotherSlider;
