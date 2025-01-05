import React from "react";
import Chat from "./components/Chat"; // Asegúrate de que la ruta esté correcta

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Chat Application</h1>
      <Chat />
    </div>
  );
};

export default App;
