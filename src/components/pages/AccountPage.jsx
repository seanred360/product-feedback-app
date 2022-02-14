import BackButton from "../common/BackButton";
import { auth } from "../firebase";
import { FaEdit } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Spinner from "../common/Spinner";

const AccountPage = () => {
  const { photoURL, displayName, email } = auth.currentUser;
  const history = useHistory();
  const [photoURLState, setPhotoURLState] = useState(photoURL);
  const [loading, setLoading] = useState(false);

  const handleRandomizePhoto = async () => {
    setLoading(true);
    const res = await fetch(
      `https://avatars.dicebear.com/api/avataaars/${Date.now()}.svg`
    );
    const newPhotoURL = await res.url;
    await auth.currentUser.updateProfile({
      photoURL: newPhotoURL,
    });
    setPhotoURLState(newPhotoURL);
    setLoading(false);
  };

  return (
    <div className="account-page">
      <div className="__top-group flex flex-ai-c flex-jc-sb">
        <BackButton />
      </div>
      <div className="window">
        <div className="__user-image-container">
          <div className="spinner-container">
            {loading ? (
              <Spinner />
            ) : (
              <img
                src={photoURLState}
                alt="user avatar"
                className="--user-image"
              />
            )}
          </div>
          <button
            className="all-buttons --purple-button --edit-photo"
            onClick={handleRandomizePhoto}
          >
            Randomize Photo
          </button>
        </div>
        <h1 className="--display-name">Welcome, {displayName}</h1>
      </div>
      <div className="__account-details">
        <ul>
          <li>
            <button
              className="--info-item"
              onClick={() => {
                history.push("/edit-account");
              }}
            >
              <div className="__left">
                <span className="--info-name">DISPLAY NAME</span>
                <span className="--info-value">{displayName}</span>
              </div>
              <FaEdit />
            </button>
          </li>
          <li>
            <button
              className="--info-item"
              onClick={() => {
                history.push("/edit-account-email");
              }}
            >
              <div className="__left">
                <span className="--info-name">EMAIL</span>
                <span className="--info-value">{email}</span>
              </div>
              <FaEdit />
            </button>
          </li>
          <li>
            <button
              className="--info-item"
              onClick={() =>
                history.push({
                  pathname: "/reset-password",
                  reauthenticate: true,
                })
              }
            >
              <div className="__left">
                <span className="--info-name">PASSWORD</span>
                <span className="--info-value">********</span>
              </div>
              <FaEdit />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountPage;
