import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Dashboard/MyAds/Navbar";

const Dashboard = () => {
  return (
    <div className="flex mt-20">
      <Sidebar />
      <div className="flex-1 p-5 mx-auto">
        <Navbar />
      </div>
    </div>
  );
};

export default Dashboard;
