import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Picker from "emoji-picker-react";

const Chat = () => {
  const [message, setMessage] = useState(""); // Estado del mensaje actual
  const [messages, setMessages] = useState([]); // Estado que guarda todos los mensajes
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Estado del emoji picker
  const [users, setUsers] = useState([]); // Estado que guarda los usuarios conectados
  const [username, setUsername] = useState(""); // Estado para guardar el nombre de usuario
  const [hasJoined, setHasJoined] = useState(false); // Estado que indica si el usuario ha ingresado al chat

  const joinChat = () => {
    if (username.trim() !== "") {
      setUsers((prevUsers) => [...prevUsers, username]);
      setHasJoined(true);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (username && users.includes(username)) {
        setUsers((prevUsers) => prevUsers.filter((user) => user !== username));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username, users]);

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
      const newMessage = { user: username, text: message };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#f4f4f9",
        paddingBottom: "30px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#3f51b5",
          marginTop: "20px",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        Chatea.com
      </Typography>

      {!hasJoined && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextField
            label="Ingresa tu nombre de usuario"
            variant="outlined"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            sx={{
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          />
          <Button
            variant="contained"
            onClick={joinChat}
            fullWidth
            sx={{
              backgroundColor: "#3f51b5",
              color: "#fff",
              "&:hover": { backgroundColor: "#303f9f" },
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            Unirse al chat
          </Button>
        </Box>
      )}

      {hasJoined && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            maxWidth: "900px",
            height: "500px",
            marginTop: "20px",
            padding: "0",
            backgroundColor: "transparent",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "5px",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "80%",
                overflowY: "scroll",
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "5px",
                userSelect: "none",
              }}
              tabIndex={-1}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  onDoubleClick={() =>
                    handleCopy(`${msg.user}: ${msg.text}`)
                  }
                  sx={{
                    padding: "8px",
                    marginBottom: "5px",
                    backgroundColor: "#f1f1f1",
                    borderRadius: "12px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                    userSelect: "text",
                  }}
                >
                  <strong>{msg.user}:</strong> {msg.text}
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "5px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "0px",
              }}
            >
              <TextField
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                sx={{
                  marginRight: "5px",
                  borderRadius: "12px",
                  backgroundColor: "#f9f9f9",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover": { borderColor: "#3f51b5" },
                  },
                }}
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
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 9999,
                }}
              >
                <Picker onEmojiClick={handleEmojiClick} />
              </Box>
            )}
          </Box>

          <Box
            sx={{
              width: "30%",
              padding: "5px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              maxHeight: "500px",
              overflowY: "auto",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              height: "415px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "8px",
                marginBottom: "5px",
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Chatea
            </Box>
            <Box sx={{ padding: "5px", borderRadius: "8px", minHeight: "40px" }}>
              {users.length === 0 ? (
                <Typography variant="body2">No hay usuarios conectados.</Typography>
              ) : (
                users.map((user, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: "5px",
                      borderRadius: "8px",
                      marginBottom: "5px",
                      userSelect: "none",
                    }}
                    tabIndex={-1}
                  >
                    {user}
                  </Box>
                ))
              )}
            </Box>

            {/* Segundo banner al final */}
            <Box
              sx={{
                backgroundColor: "#d36110",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "8px",
                marginTop: "304px", // Separación para que no se pegue al final de la lista
                textAlign: "center",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Baneados
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
