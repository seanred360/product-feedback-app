import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import { DataContextProvider } from "./custom-hooks/Contexts";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <DataContextProvider>
          <Routes />
        </DataContextProvider>
      </BrowserRouter>
    </div>
  );
};
export default App;
