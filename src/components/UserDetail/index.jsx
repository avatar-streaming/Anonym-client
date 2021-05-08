import React from "react";

function UserDetail() {
  return (
    <div>
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
              <input type="text" />
              <button>save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
