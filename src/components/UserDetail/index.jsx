import React from "react";
import useUserName from "../../hooks/useUserName";
import useUpdateUserName from "../../hooks/useUpdateUserName";
import { useSelector } from "react-redux";

function UserDetail() {
  const [userName, updateUserName] = useUserName();
  const isUpdateUserName = useUpdateUserName(userName);
  const { thumnail } = useSelector((state) => state.auth.userInfo);

  return (
    <div className="content-wrapper profile">
      <div>
        <h3 className="profile__title">Profile</h3>
      </div>
      <div>
        <h4>User Thumnail</h4>
        <img className="user-thumnail" src={thumnail} alt="user thumnail" />
        <form>
          <input type="file" accept="image/*" />
          <button>save</button>
        </form>
      </div>
      <div>
        <div>
          <h4>User Name</h4>
          <div>
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
