import React, { useEffect, useRef } from "react";
import "./slider.css"; // Import your stylesheet here
import { useNavigate } from "react-router-dom";

type AdFormProps = {
  Ads: any[];
};

function formatPriceWithCommas(price: any) {
  if (price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return ""; // or any default value you prefer if price is undefined
}

const CardSlider: React.FC<AdFormProps> = ({ Ads }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLUListElement>(null);
  const timeoutIdRef = useRef<number | null>(null);
  const startXRef = useRef<number | null>(null);
  const startScrollLeftRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const carousel = carouselRef.current;

    if (!wrapper || !carousel) {
      return;
    }

    const firstCardElement = carousel.querySelector(
      ".card"
    ) as HTMLElement | null;
    const firstCardWidth = firstCardElement?.offsetWidth || 0;

    const arrowBtns = document.querySelectorAll(".wrapper i");

    let isDragging = false;

    // Get the number of cards that can fit in the carousel at once
    const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to the beginning of the carousel for infinite scrolling
    const carouselChildrens = Array.from(carousel.children);
    carouselChildrens
      .slice(-cardPerView)
      .reverse()
      .forEach((card) => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

    // Insert copies of the first few cards to the end of the carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach((card) => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at the appropriate position to hide the first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (carousel) {
          carousel.scrollLeft +=
            btn.id === "left" ? -firstCardWidth : firstCardWidth;
        }
      });
    });

    const dragStart = (e: React.MouseEvent<HTMLUListElement>) => {
      isDragging = true;
      if (carousel) {
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startXRef.current = e.pageX;
        startScrollLeftRef.current = carousel.scrollLeft;
      }
    };

    const dragging = (e: React.MouseEvent<HTMLUListElement>) => {
      if (!isDragging || !carousel) return;
      // Updates the scroll position of the carousel based on the cursor movement
      carousel.scrollLeft =
        startScrollLeftRef.current! - (e.pageX - startXRef.current!);
    };

    const dragStop = () => {
      isDragging = false;
      if (carousel) {
        carousel.classList.remove("dragging");
      }
    };

    const infiniteScroll = () => {
      if (!carousel) return;

      const cardElement = carousel.getElementsByClassName("card")[0] as
        | HTMLElement
        | undefined;
      const cardWidth = cardElement?.offsetWidth || 0;

      // If the carousel is at the beginning, scroll to the end
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * cardWidth;
        carousel.classList.remove("no-transition");
      }
      // If the carousel is at the end, scroll to the beginning
      else if (
        carousel.scrollLeft + carousel.offsetWidth >=
        carousel.scrollWidth
      ) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }

      // Clear existing timeout & start autoplay if the mouse is not hovering over the carousel
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }

      if (wrapper && !wrapper.matches(":hover")) autoPlay();
    };

    const autoPlay = () => {
      const intervalId = setInterval(() => {
        if (carousel) {
          const cardWidth = firstCardElement?.offsetWidth || 0;
          const newPosition = carousel.scrollLeft + cardWidth;

          // If at the end, smoothly transition to the beginning
          if (newPosition >= carousel.scrollWidth - cardWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = 0;
            carousel.classList.remove("no-transition");
          } else {
            carousel.scrollLeft = newPosition;
          }
        }
      }, 5000);

      // Save the intervalId to clear it later during cleanup
      timeoutIdRef.current = intervalId;
    };

    autoPlay();

    if (carousel) {
      carousel.addEventListener("mousedown", dragStart as any);
      carousel.addEventListener("mousemove", dragging as any);
      document.addEventListener("mouseup", dragStop);
      carousel.addEventListener("scroll", infiniteScroll);
    }

    if (wrapper) {
      wrapper.addEventListener("mouseenter", () =>
        clearTimeout(timeoutIdRef.current!)
      );
      wrapper.addEventListener("mouseleave", autoPlay);
    }

    // Cleanup: Remove event listeners
    return () => {
      arrowBtns.forEach((btn) => {
        btn.removeEventListener("click", () => {
          if (carousel) {
            carousel.scrollLeft +=
              btn.id === "left" ? -firstCardWidth : firstCardWidth;
          }
        });
      });

      if (carousel) {
        carousel.removeEventListener("mousedown", dragStart as any);
        carousel.removeEventListener("mousemove", dragging as any);
        document.removeEventListener("mouseup", dragStop);
        carousel.removeEventListener("scroll", infiniteScroll);
      }
      if (wrapper) {
        wrapper.removeEventListener("mouseenter", () => {
          if (timeoutIdRef.current !== null) {
            clearTimeout(timeoutIdRef.current);
          }
        });
        wrapper.removeEventListener("mouseleave", autoPlay);
      }
    };
  }, [Ads]);

  // ... (rest of the component code)

  return (
    <div className="wrapper mt-5 overflow-hidden " ref={wrapperRef}>
      <div className="px-4  w-full overflow-hidden bg-hidden shadow-lg">
        <i id="left" className="fa-solid fa-angle-left"></i>
        <ul
          className="carousel  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 w-full  py-4 "
          ref={carouselRef}
        >
          {Ads.map((item: any) => (
            <li
              className="card rounded-lg bg-none  lg:max-w-[220px]  duration-200 cursor-pointer hover:scale-95 h-[250px] lg:h-[300px] w-[42vw] md:w-[200px] xl:w-[200px] mb-4 hover:shadow-lg  "
              key={item.product_data.producttid}
              onClick={() =>
                navigate(`ad_info/${item.product_data.producttid}`)
              }
            >
              <div className="img">
                <img
                  className="w-full h-2/3 lg:h-3/5 object-cover"
                  src={` ${item?.product_data?.mainimage}`}
                  style={{
                    borderTopRightRadius: "0.75rem",
                    borderTopLeftRadius: "0.75rem",
                  }}
                  draggable="false"
                />
              </div>

              <h1 className="text-[15px] text-black-main lg:text-md capitalize h-[40px] line-clamp-2 leading-tight overflow-y-hidden px-[6px]">
                {item?.product_data?.productname}
              </h1>
              <p className='className="text-black-main text-[18px] font-bold mt-2 px-[6px]'>
                Ksh {formatPriceWithCommas(item?.product_data?.productprice)}
              </p>
            </li>
          ))}

          {/* Add more card items as needed */}
        </ul>
        <i id="right" className="fa-solid fa-angle-right"></i>
      </div>
    </div>
  );
};

export default CardSlider;
