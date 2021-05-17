import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getOtherUserChat, sendChat } from "../api/socket";

const useChatting = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [chatList, setChatList] = useState([]);
  const chatBoxRef = useRef(null);
  const { userName } = useSelector((state) => state.authReducer.userInfo);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false);

      const trimed = inputValue.trim();

      if (trimed.length) {
        const chat = {
          userName,
          content: trimed,
        };

        sendChat(chat);
        setChatList([...chatList, chat]);
        setInputValue("");
      }
    }
  }, [isSubmit, chatList, inputValue, userName]);

  useEffect(() => {
    return getOtherUserChat(chatList, setChatList);
  }, [chatList]);

  useEffect(() => {
    const chatBox = chatBoxRef.current;

    chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
  }, [chatList]);

  return {
    inputValue,
    updateInputValue: setInputValue,
    handleSubmit,
    chatList,
    chatBoxRef,
  };
};

export default useChatting;
