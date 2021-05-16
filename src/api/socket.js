import io from "socket.io-client";

const socket = io(process.env.REACT_APP_USER_SERVER);

export const checkRoom = (id) => {
  socket.emit("join streaming", id);

  return () => {
    socket.emit("leave streaming", id);
  };
};

export const sendChat = (chat) => {
  socket.emit("chat", chat);
};

export const getOtherUserChat = (chatList, updateChatList) => {
  socket.on("other user chat", (chat) => {
    updateChatList([...chatList, chat]);
  });

  return () => {
    socket.off("other user chat");
  };
};
