import SellersAdsComp from "../components/SellersAdsComp";
import Filters from "../constants/Filters";
const SellersAds = () => {
  return (
    <div className="flex parent ">
      <Filters />
      <div className="flex-1 mx-auto  my-body px-3 py-4">
        <SellersAdsComp />
      </div>
    </div>
  );
};

export default SellersAds;
