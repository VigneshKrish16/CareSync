/* eslint-disable react/prop-types */
/* import PropTypes from "prop-types"*/

export const Chats = (props) => {
  const userLogo =
    "https://as1.ftcdn.net/v2/jpg/02/51/55/46/1000_F_251554631_FLQCoeVFXWjSr32bCSC3cK75JSy3CiSI.jpg";
  // eslint-disable-next-line react/prop-types
  const botLogo =
    "https://thumbs.dreamstime.com/b/robot-icon-chat-bot-sign-support-service-concept-chatbot-character-flat-style-152282746.jpg";
  const { chats } = props;
  return (
    <div>
      {chats.map((chat, index) => (
        <div key={index} className={chat.type}>
          <img src={chat.type === "userChat" ? userLogo : botLogo} alt="Bot" />
          <div>
            <h1>{chat.type === "userChat" ? "You" : "Bot"}</h1>
            <p>{chat.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

/* // Prop validation
  Chats.propTypes = {
    chats: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
   */
