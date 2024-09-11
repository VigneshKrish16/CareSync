import { useEffect, useState } from "react";
import "../styles/chat.css";
import send from "../assets/send.svg";
import { Chats } from "./Chats";
import axios from "axios";

const loadElem = () => {
  return (
    <div className="loading loading04">
      <span>.</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
};
export const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([
    {
      message:
        "Hey there !, Let me help you with your queries. What can I do for you?",
      type: "botChat",
    },
  ]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Retrieve chat history from local storage when component mounts
    const storedChats = JSON.parse(localStorage.getItem("chats"));
    if (storedChats) {
      setChats(storedChats);
    }
  }, []);

  useEffect(() => {
    // Save chat history to local storage whenever it changes
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const handleSend = async (e) => {
    e.preventDefault();

    const newChat1 = { message: message, type: "userChat" };

    // Update the chats state with the new user message
    setChats((prevChats) => [...prevChats, newChat1]);

    try {
      setLoading(true);
      setMessage(""); // Clear the input field after sending
      console.log(chats);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/process_context`,
        {
          question: message,
          userId: parseInt(localStorage.getItem("UserID")),
        }
      );

      const newChat2 = {
        message: response.data.answer,
        type: "botChat",
      };

      // Add the bot response to the chat state
      setChats((prevChats) => [...prevChats, newChat2]);
      setLoading(false);
    } catch (error) {
      console.log(chats);

      const newChat2 = {
        message: error.response
          ? error.response.data.error
          : "An error occurred",
        type: "botChat",
      };

      console.log(chats);

      // Add the error message to the chat state
      setChats((prevChats) => [...prevChats, newChat2]);
      setMessage(""); // Clear the input field after sending
      setLoading(false);
    }
  };

  return (
    <div className="Chat">
      <div className="chatArea">
        <div className="chatScroll">
          <Chats chats={chats} />
          {loading ? loadElem() : null}
        </div>
        <form onSubmit={handleSend} className="inputField">
          <input
            placeholder="Ask me anything !!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
          {loading ? (
            <div className="loader" />
          ) : (
            <img onClick={handleSend} src={send} alt="send" />
          )}
        </form>
      </div>
    </div>
  );
};
