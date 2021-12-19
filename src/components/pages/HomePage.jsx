import React, { useContext } from "react";
import _ from "lodash";
import SuggestionsEmpty from "../ProductRequestEmpty";
import SuggestionBox from "../ProductRequest";
import {
  DataContext,
  ProductRequestContext,
} from "../../custom-hooks/Contexts";
import { useHistory } from "react-router";

const HomePage = () => {
  const history = useHistory();
  const data = useContext(DataContext);
  const { setSelectedProductRequest } = useContext(ProductRequestContext);
  const productRequests = data["productRequests"];

  const handleClick = (product) => {
    setSelectedProductRequest(product);
    history.push("/feedback-detail");
  };

  if (!productRequests) return <SuggestionsEmpty />;
  return (
    <>
      <div className="home-page">
        {productRequests.map((product) => (
          <SuggestionBox
            key={product["title"]}
            title={product["title"]}
            description={product["description"]}
            category={product["category"]}
            upvotes={product["upvotes"]}
            commentsCount={_.size(product["comments"])}
            onClickEvent={() => handleClick(product)}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;

// class HomePage extends Component {
//   handleOnClick = (selectedProductRequest) => {
//     this.props.onSelectRequest(selectedProductRequest);
//     this.props.history.push("/feedback-detail");
//   };

//   render() {
//     // const { productRequests } = this.props;

//     // if (productRequests.length <= 0)
//     //   return (
//     //     <>
//     //       <Menu />
//     //       <SuggestionsEmpty />
//     //     </>
//     //   );

//     return (
//       <>
//         <Menu />
//         <div className="home-page">
//           {/* {productRequests.map((product) => (
//             <SuggestionBox
//               key={product["title"]}
//               title={product["title"]}
//               description={product["description"]}
//               category={product["category"]}
//               upvotes={product["upvotes"]}
//               commentsCount={_.size(product["comments"])}
//               onClickEvent={() => this.handleOnClick(product)}
//             />
//           ))} */}
//         </div>
//       </>
//     );
//   }
// }

// export default HomePage;
