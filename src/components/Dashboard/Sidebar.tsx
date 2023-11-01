import { Avatar } from "antd";
import { DashboardLinks } from "../../data/links";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CloseTwoTone } from "@mui/icons-material";
import { setProfileOpener } from "../../Redux/slices/opener";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state:any) => state.auth.user);
  const { profileOpener } = useSelector((state:any) => state.opener);
  const dispatch = useDispatch()

  return (
    <div>
      <div
        className="px-6 bg-gray-light m-3 overflow-y-auto pt-10 my-sidebar"
        style={{
          width: "22vw",
          height: "100vh",
          borderRadius: "2px",
          position: "sticky",
          top: "0",
        }}
      >
        <ul className="pt-6">
          {DashboardLinks.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-primary-orange hover:text-white text-sm items-center gap-4 bg-white ${"mt-2"} ${
                index === 0 ? "bg-light-white" : ""
              }`}
              onClick={() => navigate(`/${Menu.url}`)}
            >
              <img src={Menu.icon} className="h-8 object-cover" alt={Menu.name} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div className="flex items-center mt-10 flex-col " >
          <Avatar
            alt="Jane Doe"
            src={`data:image/jpeg;base64, ${user?.userimage}`}
            className="h-24 w-24 border-4 border-primary-orange " 
          />
          <span className="text mt-5 capitalize">{`${user?.firstname} ${user?.lastname}`}</span>
        </div>
      </div>
      {/* on small screens */}
      {profileOpener && (
        <div
          className="px-6 bg-gray-light m-3 mt-20 overflow-y-auto pt-10"
          style={{
            height: "80vh",
            borderRadius: "2px",          
            top: "0",
            position :"fixed",
            bottom:"10px",
            inset:"0",
            zIndex: "9999"
          }}
        >
          <div className="flex justify-end " onClick={()=>{
              dispatch(setProfileOpener(false))

console.log(profileOpener)            }}><CloseTwoTone className="bg-primary-orange p-1 rounded-full text-right h-24 text-white
          cursor-pointer"  /></div>
          <ul className="pt-6">
            {DashboardLinks.map((Menu, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-primary-orange hover:text-white text-sm items-center gap-4 bg-white ${"mt-2"} ${
                  index === 0 ? "bg-light-white" : ""
                }`}
                onClick={() => navigate(`/${Menu.url}`)}
              >
                <img src={Menu.icon} className="h-8 object-cover" alt={Menu.name} />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.name}
                </span>
              </li>
            ))}
          </ul>

          {/* Sidebar Footer */}
          <div className="flex items-center mt-10 flex-col">
            <Avatar
              alt="Jane Doe"
              src={`data:image/jpeg;base64, ${user?.userimage}`}
              className="h-24 w-24 border-4 border-primary-orange"
            />
            <span className="text mt-5 capitalize">{`${user?.firstname} ${user?.lastname}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
