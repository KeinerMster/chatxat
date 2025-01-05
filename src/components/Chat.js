import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Picker from "emoji-picker-react";

const Chat = () => {
  const [message, setMessage] = useState(""); // Estado del mensaje actual
  const [messages, setMessages] = useState([]); // Estado que guarda todos los mensajes
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Estado del emoji picker

  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f4f4f9",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
        Chatea.com
      </Typography>

      <Box
        sx={{
          height: "400px",
          overflowY: "scroll",
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              padding: "8px",
              marginBottom: "10px",
              backgroundColor: "#e1e1e1",
              borderRadius: "12px",
            }}
          >
            {msg}
          </Box>
        ))}
      </Box>

      {/* Contenedor del formulario de mensaje */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          sx={{ marginRight: "8px" }}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😀
        </IconButton>
      </Box>

      {showEmojiPicker && (
        <Box
          sx={{
            position: "absolute",
            bottom: "80px",
            left: "0",
            width: "100%",
            zIndex: 1,
          }}
        >
          <Picker onEmojiClick={handleEmojiClick} />
        </Box>
      )}
    </Box>
  );
};

export default Chat;
