import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function SideNav() {
  const { followings } = useSelector((state) => state.user.userInfo);

  return (
    <div className="nav-side">
      <div className="nav-side__following-list">
        {
          followings.map((follwing) => (
            <UserCard key={follwing._id} user={follwing} />
          ))
        }
      </div>
    </div>
  );
}

export default SideNav;
