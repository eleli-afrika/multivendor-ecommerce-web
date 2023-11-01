import "./App.css";
import Loader from "./constants/loader";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import { useSelector } from "react-redux";
function App() {
  const { loading } = useSelector((state: any) => state.loaders);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}
export default App;
