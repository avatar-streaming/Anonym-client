import React from "react";
import useUserName from "../../hooks/useUserName";
import useUpdateUserName from "../../hooks/useUpdateUserName";

function UserDetail() {
  const [userName, updateUserName] = useUserName();
  const isUpdateUserName = useUpdateUserName(userName);

  return (
    <div className="content-wrapper">
      <div>
        <h3>Profile</h3>
      </div>
      <div>
        <h4>Profile Picture</h4>
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
                value={userName}
                onChange={(e) => {
                  updateUserName(e.target.value.trim());
                }}
              />
              <button onClick={(e) => {
                e.preventDefault();
                isUpdateUserName(true);
              }}>save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
