import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Picker from "emoji-picker-react"; // Asegúrate de instalar esta librería si no lo has hecho

const Chat = () => {
  const [message, setMessage] = useState(""); // Estado del mensaje actual
  const [messages, setMessages] = useState([]); // Estado que guarda todos los mensajes
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Estado del emoji picker
  const [users, setUsers] = useState([]); // Estado que guarda los usuarios conectados
  const [username, setUsername] = useState(""); // Estado para guardar el nombre de usuario
  const [hasJoined, setHasJoined] = useState(false); // Estado que indica si el usuario ha ingresado al chat

  // Lógica para agregar usuario al entrar al chat
  const joinChat = () => {
    if (username.trim() !== "") {
      setUsers((prevUsers) => [...prevUsers, username]); // Agregar el usuario a la lista de usuarios conectados
      setHasJoined(true); // Marcar que el usuario ha ingresado al chat
    }
  };

  // Detectar cuando el usuario cierra la ventana o la página
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (username && users.includes(username)) {
        setUsers((prevUsers) => prevUsers.filter(user => user !== username)); // Eliminar usuario al cerrar la página
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username, users]);

  // Cargar los mensajes desde localStorage cuando la página se carga
  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages)); // Cargar los mensajes si existen en localStorage
    }
  }, []);

  // Guardar los mensajes en localStorage cada vez que se actualizan
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("messages", JSON.stringify(messages)); // Guardar los mensajes en localStorage
    }
  }, [messages]);

  // Función para manejar el clic en un emoji
  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji.emoji); // Añadir el emoji al mensaje
    setShowEmojiPicker(false); // Cerrar el emoji picker después de seleccionar un emoji
  };

  // Función para enviar el mensaje
  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = { user: username, text: message }; // Crear un objeto de mensaje con el usuario y el texto
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Agregar el mensaje
      setMessage(""); // Limpiar el campo de mensaje
    }
  };

  return (
    <Box sx={{
      display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh", flexDirection: "column", padding: "0", backgroundColor: "#f4f4f9", paddingBottom: "30px"
    }}>
      {/* Título fuera del contenedor de chat */}
      <Typography variant="h4" align="center" sx={{
        marginBottom: "20px", fontWeight: "bold", color: "#3f51b5", marginTop: "20px", textShadow: "2px 2px 5px rgba(0,0,0,0.3)"
      }}>
        Chatea.com
      </Typography>

      {/* Contenedor de nombre de usuario y botón de unirse al chat, centrado */}
      {!hasJoined && (
        <Box sx={{
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: "400px", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
        }}>
          <TextField
            label="Ingresa tu nombre de usuario"
            variant="outlined"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            sx={{
              marginBottom: "15px", borderRadius: "8px"
            }}
          />
          <Button
            variant="contained"
            onClick={joinChat}
            fullWidth
            sx={{
              backgroundColor: "#3f51b5", color: "#fff", '&:hover': { backgroundColor: "#303f9f" }, padding: "10px", borderRadius: "8px"
            }}
          >
            Unirse al chat
          </Button>
        </Box>
      )}

      {/* Contenedor de mensajes y usuarios conectados */}
      {hasJoined && (
        <Box sx={{
          display: "flex", flexDirection: "row", width: "100%", maxWidth: "900px", height: "500px", marginTop: "20px", padding: "0", backgroundColor: "transparent", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
        }}>
          {/* Contenedor de mensajes */}
          <Box sx={{
            width: "70%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "5px", height: "100%", overflow: "hidden"
          }}>
            {/* Contenedor de los mensajes */}
            <Box sx={{
              height: "80%", overflowY: "scroll", padding: "10px", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", marginBottom: "5px"
            }}>
              {messages.map((msg, index) => (
                <Box key={index} sx={{
                  padding: "8px", marginBottom: "5px", backgroundColor: "#f1f1f1", borderRadius: "12px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
                }}>
                  <strong>{msg.user}:</strong> {msg.text}
                </Box>
              ))}
            </Box>

            {/* Contenedor del formulario de mensaje */}
            <Box sx={{
              display: "flex", alignItems: "center", padding: "5px", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", marginBottom: "0px"
            }}>
              <TextField
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Actualiza el mensaje con lo que escribe el usuario
                fullWidth
                sx={{
                  marginRight: "5px", borderRadius: "12px", backgroundColor: "#f9f9f9", '& .MuiOutlinedInput-root': {
                    borderRadius: "12px", '&:hover': { borderColor: "#3f51b5" }
                  }
                }}
              />
              <IconButton color="primary" onClick={sendMessage}>
                <SendIcon />
              </IconButton>

              {/* Botón para mostrar el picker de emojis */}
              <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                😀
              </IconButton>
            </Box>

            {/* Mostrar el emoji picker si está activo, posicionado en el centro */}
            {showEmojiPicker && (
              <Box sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // Centrado en la pantalla
                zIndex: 9999, // Asegúrate de que el picker esté por encima de otros elementos
              }}>
                <Picker onEmojiClick={handleEmojiClick} />
              </Box>
            )}
          </Box>

          {/* Contenedor de la lista de usuarios conectados (lado derecho) */}
          <Box sx={{
            width: "30%", padding: "5px", backgroundColor: "#fff", borderRadius: "12px", maxHeight: "500px", overflowY: "auto", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}>
            {/* Banner de usuarios conectados */}
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
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.2s",
    '&:hover': {
      boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
    },
  }}
>
  Chatea
</Box>
            <Box sx={{ padding: "5px", borderRadius: "8px", minHeight: "40px" }}>
              {users.length === 0 ? (
                <Typography variant="body2">No hay usuarios conectados.</Typography>
              ) : (
                users.map((user, index) => (
                  <Box key={index} sx={{
                    padding: "0px", borderRadius: "8px", marginBottom: "5px"
                  }}>
                    {user}
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
