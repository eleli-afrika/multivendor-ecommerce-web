import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserAdsLinks as Links } from "../../../data/links";
import close from "../../../assets/close.png";
import menu from "../../../assets/menu.png";
import { IconButton } from "@mui/material";

const Navbar = () => {
  const location = useLocation(); // Get the current route location
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
    <nav
      className={`w-full px-5 flex items-center top-0 z-20 ${
        scrolled ? "bg-gray-light" : "bg-gray-light"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto h-[60px] rounded">
        <ul className="list-none hidden sm:flex flex-row gap-10">
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
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[300px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {Links.map((nav) => (
                <li
                  key={nav.name}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    location.pathname === nav.url
                      ? "text-white"
                      : "text-secondary"
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
  );
};

export default Navbar;
