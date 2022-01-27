// import { createContext, useEffect, useState } from "react";
// import useAxios from "../custom-hooks/useAxios";
// import Spinner from "../components/common/Spinner";

// export const DataContext = createContext(null);

// export const DataContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState({});
//   const [productRequests, setProductRequests] = useState({});
//   const [filteredProducts, setFilteredProducts] = useState({});
//   const [selectedProduct, setSelectedProduct] = useState();

//   const { response, loading, error } = useAxios({
//     method: "get",
//     url: "https://product-feedback-rest-api.herokuapp.com/productrequests",
//   });

//   useEffect(() => {
//     if (response !== null) {
//       // setCurrentUser(response["currentUser"]);
//       setProductRequests(response);
//       setFilteredProducts(response);
//     }
//   }, [response]);

//   if (loading) return <Spinner />;
//   if (error) return <h1>ERROR</h1>;
//   return (
//     <DataContext.Provider
//       value={{
//         // currentUser,
//         // setCurrentUser,
//         productRequests,
//         setProductRequests,
//         filteredProducts,
//         setFilteredProducts,
//         selectedProduct,
//         setSelectedProduct,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };
