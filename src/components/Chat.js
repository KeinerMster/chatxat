import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Picker from "emoji-picker-react"; // Asegúrate de instalar esta librería si no lo has hecho

const Chat = () => {
  const [message, setMessage] = useState(""); // Estado del mensaje actual
  const [messages, setMessages] = useState([]); // Estado que guarda todos los mensajes
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Estado del emoji picker

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
      setMessages((prevMessages) => [...prevMessages, message]); // Agregar el mensaje
      setMessage(""); // Limpiar el campo de mensaje
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "0 auto", padding: "20px", backgroundColor: "#f4f4f9", borderRadius: "8px", position: "relative" }}>
      {/* Contenedor de los mensajes */}
      <Box sx={{ height: "400px", overflowY: "scroll", marginBottom: "20px", padding: "10px", backgroundColor: "#fff", borderRadius: "8px" }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ padding: "8px", marginBottom: "10px", backgroundColor: "#e1e1e1", borderRadius: "12px" }}>
            {msg}
          </Box>
        ))}
      </Box>

      {/* Contenedor del formulario de mensaje */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Actualiza el mensaje con lo que escribe el usuario
          fullWidth
          sx={{ marginRight: "8px" }}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>

        {/* Botón para mostrar el picker de emojis */}
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😀
        </IconButton>
      </Box>

      {/* Mostrar el emoji picker si está activo, posicionado debajo del formulario */}
      {showEmojiPicker && (
        <Box sx={{
          position: "absolute",
          bottom: "80px", // Ajusta la posición según el diseño de tu aplicación
          left: "0",
          width: "100%",
          zIndex: 1,
        }}>
          <Picker onEmojiClick={handleEmojiClick} />
        </Box>
      )}
    </Box>
  );
};

export default Chat;
