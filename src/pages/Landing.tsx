import Sidebar from "../constants/sidebar";
import ImageSlider from "../components/landing/slider";
import Popular from "../components/landing/popular";
import { useEffect } from "react";
import { currentUser } from "../Redux/hooks/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../Redux/slices/LoaderSlice";
import { toast } from "react-toastify";
import { setUser } from "../Redux/slices/AuthSlice";
// import Minslider from "../components/landing/minislider";
import AnotherSlider from "../components/landing/AotherSlider";
import Filters from "../constants/Filters";
// import Packages from "../components/packages";
import Package from "../components/services/Package";
// import axios from "axios";

const Landing = () => {
  const userToken = useSelector((state: any) => state.auth.userToken);
  const dispatch = useDispatch();
  // const login = async () => {
  //   const response = await axios.get(
  //     "http://13.245.255.54:8000/products/getproducts"
  //   );
  //   console.log(response.data);
  // };

  const getUser = async () => {
    try {
      dispatch(setLoader(true));
      const response = await currentUser();
      // toast.success("user Fetched successfully");
      // console.log(response.data.Data);
      dispatch(setUser(response.data.Data));
      dispatch(setLoader(false));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   console.log(login());
  // }, []);

  useEffect(() => {
    if (userToken) {
      getUser();
    }
  }, []);
  return (
    <div>
      <div className="">
        <div className="flex parent ">
          <Sidebar />
          <div className="flex-1 mx-auto  my-body ">
            <ImageSlider />
          </div>
        </div>
        <AnotherSlider />

        <div className="flex parent">
          <Filters />
          <div className="flex-1 mx-auto  my-body ">
            {/* <Minslider /> */}
            <Popular />
            <div className="hidden md:block">
              {" "}
              <Package />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
