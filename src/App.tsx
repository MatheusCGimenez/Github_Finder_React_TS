import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  return (
    <div className="main_container">
      {location.pathname === "/" && <h1>Github Finder</h1>}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Outlet />
    </div>
  );
}

export default App;
