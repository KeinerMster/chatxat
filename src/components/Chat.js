import React, { useState } from "react";
import { TextField, Button, IconButton, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from "emoji-picker-react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Función para enviar mensajes
  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages([...messages, message]);
    setMessage("");
  };

  // Función para manejar la selección de emojis
  const handleEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#f4f4f9", borderRadius: "8px" }}>
      <Box sx={{ height: "400px", overflowY: "scroll", marginBottom: "20px", padding: "10px", backgroundColor: "#fff", borderRadius: "8px" }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ padding: "8px", marginBottom: "10px", backgroundColor: "#e1e1e1", borderRadius: "12px" }}>
            {msg}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          sx={{ marginRight: "8px" }}
        />
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <span role="img" aria-label="emoji">😊</span>
        </IconButton>
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>

      {showEmojiPicker && (
        <Box sx={{ position: "absolute", bottom: "100px", left: "50%", transform: "translateX(-50%)" }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Box>
      )}
    </Box>
  );
};

export default Chat;
