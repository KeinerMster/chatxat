
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Backend URL

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.disconnect();
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_message", { text: message, sender: "Usuario" });
            setMessage("");
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Chat en Tiempo Real</h1>
            <div style={{ border: "1px solid #ccc", padding: "10px", maxHeight: "300px", overflowY: "scroll" }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <b>{msg.sender}:</b> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                style={{ padding: "10px", width: "80%" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px 20px" }}>Enviar</button>
        </div>
    );
}

export default App;
