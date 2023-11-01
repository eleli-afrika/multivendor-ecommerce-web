import { useState } from "react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Dashboard/MyAds/Navbar";
import AdsTable from "../../components/Dashboard/MyAds/Closed.Table";
import AdsComp from "../../components/Dashboard/ClosedComp";

const Closed = () => {
  const [showTable, setShowTable] = useState(false);
  return (
    <div className="flex mt-20 parent">
      <Sidebar />
      <div className="flex-1 p-5 mx-auto my-body">
        <Navbar />
        <div className="flex justify-end">
          <button
            className="mt-2 flex bg-primary-orange rounded p-2 text-white capitalize hover:bg-secondary-orange transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              setShowTable(!showTable);
            }}
          >
            Toggle View
          </button>
        </div>

        {!showTable && <AdsComp />}
        {showTable && <AdsTable />}
      </div>
    </div>
  );
};

export default Closed;
