import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";
import "./index.css";
import store from "./Redux/store.tsx";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>
);
