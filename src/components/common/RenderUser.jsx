const RenderUser = ({ photoURL, displayName, email }) => {
  return (
    <div className="user">
      <img src={photoURL} alt="user avatar" className="--user-image" />
      <div className="__right">
        <span className="--display-name">{displayName}</span>
        <span className="--email">{email}</span>
      </div>
    </div>
  );
};

export default RenderUser;
