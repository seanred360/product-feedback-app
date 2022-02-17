import Spinner from "./Spinner";

const PageSpinner = ({ height = "100vh" }) => {
  return (
    <div style={{ height: height, display: "flex", justifyContent: "center" }}>
      <Spinner />
    </div>
  );
};

export default PageSpinner;
