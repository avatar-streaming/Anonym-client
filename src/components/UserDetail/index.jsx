import React from "react";
import useUserName from "../../hooks/useUserName";
import useUpdateUserName from "../../hooks/useUpdateUserName";
import { useSelector } from "react-redux";

function UserDetail() {
  const [userName, updateUserName] = useUserName();
  const isUpdateUserName = useUpdateUserName(userName);
  const { thumnail } = useSelector((state) => state.auth.userInfo);

  return (
    <div className="content-wrapper">
      <div>
        <h3>Profile</h3>
      </div>
      <div>
        <h4>Profile Picture</h4>
        <img className="user-thumnail" src={thumnail} alt="user thumnail" />
        <form>
          <input type="file" accept="image/*" />
          <button>save</button>
        </form>
      </div>
      <div>
        <div>
          <h4>Profile Setting</h4>
          <div>
            <h5>Username</h5>
            <form>
              <input
                type="text"
                className="input-text"
                value={userName}
                onChange={(e) => {
                  updateUserName(e.target.value.trim());
                }}
              />
              <button onClick={(e) => {
                e.preventDefault();
                isUpdateUserName(true);
              }}>
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
