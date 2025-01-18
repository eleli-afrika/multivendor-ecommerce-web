import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserAdsLinks as Links } from "../../../data/links";
import close from "../../../assets/close.png";
import menu from "../../../assets/menu.png";
import { IconButton } from "@mui/material";

const Navbar = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="md:p-0 p-0">
      <nav
        className={`w-full px-[20px] flex items-center top-0 z-20 ${
          scrolled ? "bg-gray-light" : "bg-gray-light rounded-[8px]"
        }`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto h-[60px] rounded">
          <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
            {Links.map((nav) => (
              <li
                key={nav.name}
                className={`${
                  location.pathname === nav.url
                    ? "text-primary-orange"
                    : "text-dark"
                } capitalize hover:text-white text-[18px] font-medium cursor-pointer`}
              >
                <Link to={nav.url}>{nav.name}</Link>
              </li>
            ))}
          </ul>

          <div className="sm:hidden flex flex-1 justify-end items-center">
            <IconButton
              style={{
                color: "#991b1b",
                backgroundColor: "#eee",
                cursor: "pointer",
              }}
              onClick={() => setToggle(!toggle)}
            >
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="w-[24px] h-[24px] object-contain"
              />
            </IconButton>

            <div
              className={`${
                !toggle ? "hidden" : "flex flex-col items-center "
              } p-6 bg-black-main absolute top-[32.4%] right-0 transform  mx-4 my-2 min-w-[250px] z-10 `}
            >
              <ul className="list-none flex flex-col gap-4">
                {Links.map((nav) => (
                  <li
                    key={nav.name}
                    className={` cursor-pointer text-[16px] capitalize font-bold ${
                      location.pathname === nav.url
                        ? "text-secondary-orange"
                        : " text-white"
                    }`}
                  >
                    <Link to={nav.url}>{nav.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
