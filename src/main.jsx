/* ⚛ REACT */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* 📦 LIBS */
import { RouterProvider } from "react-router";

/* 🧩 COMPONENTS */
import Message from "./components/message";
import Modal from "./components/modal";

/* 🧠 CONTEXT */
import { MessageProvider } from "./context/MessageContext";
import { ChatProvider } from "./context/ChatContext";
import { ModalProvider } from "./context/ModalContext";
import { ReloadProvider } from "./context/ReloadChatsContext";
import { ContactsProvider } from "./context/ContactsContext";

/* 🧭 ROUTES */
import { router } from "./routes";

/* 🎨 STYLES */
import "./index.css";
import { Container } from "./styles/global";

/* SERVER */
import { initServerMonitor } from "./utils/loadBalancer";

// Inicializa o monitoramento antes de renderizar
initServerMonitor((server) => {
  console.log("Active server:", server);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContactsProvider>
      <MessageProvider>
        <ModalProvider>
          <ChatProvider>
            <ReloadProvider>
                <Container>
                  <Message />
                  <RouterProvider router={router} />
                  <Modal />
                </Container>
            </ReloadProvider>
          </ChatProvider>
        </ModalProvider>
      </MessageProvider>
    </ContactsProvider>
  </StrictMode>,
)
