import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./custom-hooks/AuthContext";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
            <ToastContainer />
            <Routes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};
export default App;
