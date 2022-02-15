import { useAuth } from "../custom-hooks/AuthContext";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import RenderCategoryButtons from "./RenderCategoryButtons";
import RoadMapOverview from "./RoadMapOverview";
import RenderUser from "../components/common/RenderUser";

const MobileSlideOut = ({ setIsOpen, isOpen, dataToSort, setData }) => {
  const { logout } = useAuth();
  const { photoURL, displayName, email } = auth.currentUser;
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await logout();
      history.push("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <div className={`fade-overlay ${isOpen ? `--open` : ``}`} />
      <div className={`slide-out-container ${isOpen ? `--open` : ``}`}>
        <div className="mobile-slide-out">
          <div className="account-menu">
            <RenderUser
              photoURL={photoURL}
              displayName={displayName}
              email={email}
            />
            <div className="__bottom">
              <button
                className="--settings all-buttons --blue-button"
                onClick={() =>
                  history.push({ pathname: "/log-in", reauthenticate: true })
                }
              >
                Settings
              </button>
              <button
                className="--logout all-buttons --red-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <RenderCategoryButtons
            dataToSort={dataToSort}
            setData={setData}
            setIsOpen={setIsOpen}
          />
          <RoadMapOverview feedback={dataToSort} />
        </div>
      </div>
    </>
  );
};

export default MobileSlideOut;
