import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import { DataContextProvider } from "./custom-hooks/Contexts";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./custom-hooks/AuthContext";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <DataContextProvider>
            <ToastContainer />
            <Routes />
          </DataContextProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};
export default App;
