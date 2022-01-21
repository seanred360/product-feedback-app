import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import { DataContextProvider } from "./custom-hooks/Contexts";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <DataContextProvider>
          <ToastContainer />
          <Routes />
        </DataContextProvider>
      </BrowserRouter>
    </div>
  );
};
export default App;
