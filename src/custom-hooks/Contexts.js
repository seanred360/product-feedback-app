import { createContext, useEffect, useState } from "react";
import useAxios from "../custom-hooks/useAxios";
import Spinner from "../components/common/Spinner";

export const DataContext = createContext(null);

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [filteredProducts, setFilteredProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});

  const { response, loading, error } = useAxios({
    method: "get",
    url: "data.json",
  });

  useEffect(() => {
    if (response !== null) {
      setData(response);
      setFilteredProducts(response["productRequests"]);
    }
  }, [response]);

  if (loading) return <Spinner />;
  if (error) return <h1>ERROR</h1>;
  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        filteredProducts,
        setFilteredProducts,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// export const SelectedProductContextProvider = ({ children }) => {
//   const [selectedProduct, setSelectedProduct] = useState({});

//   return (
//     <SelectedProductContext.Provider
//       value={{ selectedProduct, setSelectedProduct }}
//     >
//       {children}
//     </SelectedProductContext.Provider>
//   );
// };
