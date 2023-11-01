import Popular from "../components/landing/popular";
import Filters from "../constants/Filters";

const AdsPage = () => {
  return (
    <div className="flex parent ">
      <Filters />
      <div className="flex-1 mx-auto  my-body ">
        <Popular />
      </div>
    </div>
  );
};

export default AdsPage;
