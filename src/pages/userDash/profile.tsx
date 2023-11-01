import Sidebar from "../../components/Dashboard/Sidebar";
import Profile from "../../components/Dashboard/profile";

const profile = () => {
  return (
    <div className="flex parent">
      <Sidebar />
      <div className="flex-1 p-5 mx-auto my-body">
        <Profile />
      </div>
    </div>
  );
};

export default profile;
