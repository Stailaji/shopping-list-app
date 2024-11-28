import React from "react";
import { createRoot } from "react-dom/client"; // Neue Methode
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

// Hole das Root-Element aus dem HTML
const rootElement = document.getElementById("root");

// Erstelle die React-Root-Instanz und rendere die App
if (rootElement) {
  const root = createRoot(rootElement); // createRoot anstelle von ReactDOM.render
  root.render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
}
