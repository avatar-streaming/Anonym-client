import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { joinRoom, leaveRoom } from "../api/socket";

const useJoinAndLeaveRoom = () => {
  const { _id: userId } = useSelector((state) => state.auth.userInfo);
  const { id } = useParams();

  useEffect(() => {
    joinRoom(id);

    return () => {
      leaveRoom(id);
    };
  }, [id]);

  return { userId, id };
};

export default useJoinAndLeaveRoom;
