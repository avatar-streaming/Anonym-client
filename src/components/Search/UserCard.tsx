import useCheckFollow from "../../hooks/useCheckFollow";
import useFollow from "../../hooks/useFollow";
import useUnfollow from "../../hooks/useUnfollow";

<<<<<<< HEAD:src/components/Search/UserCard.tsx
interface UserCardProps {
  _id: string;
  thumnail: string;
  userName: string;
  followers: string[];
}

function UserCard({ _id, thumnail, userName, followers }: UserCardProps) {
=======
function UserCard({ _id, thumnail, userName, followers }) {
>>>>>>> c05b8641dad7cfa992c68cc1b3c69d422f4bf8ce:src/components/Search/UserCard.jsx
  const isFollow = useCheckFollow(_id);
  const followUser = useFollow();
  const unfollowUser = useUnfollow();

  return (
    <div className="user-card">
      <div className="user-card__left">
        <img
          className="user-card__thumnail user-thumnail"
          src={thumnail}
          alt="user thumnail"
        />
      </div>
      <div className="user-card__right">
        <div className="user-card__description">
          <div className="user-card__user-name">
            {userName}
          </div>
          <div className="follower-number">
            {followers.length} followers
          </div>
        </div>
        <div className="follow-button-box">
          {
            isFollow ? (
              <button
                className="follow-button"
                onClick={() => {
                  unfollowUser(_id);
                }}
              >
                unfollow
              </button>
            ) : (
              <button
                className="follow-button"
                onClick={() => {
                  followUser(_id);
                }}
              >
                follow
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default UserCard;
