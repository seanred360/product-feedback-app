import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import { DataContext, ProductRequestContext } from "./custom-hooks/Contexts";
import useAxios from "./custom-hooks/useAxios";
import Spinner from "./components/common/Spinner";

const App = () => {
  // Global like variables
  const [data, setData] = useState({});
  const [selectedProductRequest, setSelectedProductRequest] = useState({});

  const { response, loading, error } = useAxios({
    method: "get",
    url: "data.json",
  });

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

  if (loading) return <Spinner />;
  return (
    <div className="App">
      <BrowserRouter>
        <DataContext.Provider value={data}>
          <ProductRequestContext.Provider
            value={{ selectedProductRequest, setSelectedProductRequest }}
          >
            <Routes />
          </ProductRequestContext.Provider>
        </DataContext.Provider>
      </BrowserRouter>
    </div>
  );
};
export default App;
