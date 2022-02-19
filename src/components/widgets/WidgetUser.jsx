import { useHistory } from "react-router-dom";
import { useAuth } from "../../custom-hooks/AuthContext";
import RenderUser from "../common/RenderUser";
import { toast } from "react-toastify";
import { auth } from "../firebase";

const WidgetUser = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const { photoURL, displayName, email } = auth.currentUser;

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
    <div className="widget-user">
      <RenderUser photoURL={photoURL} displayName={displayName} email={email} />
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
  );
};

export default WidgetUser;
