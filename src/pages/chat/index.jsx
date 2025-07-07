/* ⚛ REACT */
import React, { useContext, useEffect, useRef, useState } from "react";

/* 📦 LIBS */
import { useMediaQuery } from "@react-hook/media-query";

/* 🧩 COMPONENTS */
import Menu from "../../components/menu";

/* 📁 ASSETS*/
import { send, clip, menu, group } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, SendIcon, ClipIcon, MenuIcon, ChatIcon } from "./styles";

import { useChatInfo } from "../../hooks/useChatInfo";

import { MessageContext } from "../../context/MessageContext";
import { ChatContext } from "../../context/ChatContext";


const Chat = () => {
  const { chatID, messages, addMessage } = useContext(MessageContext);
  const { sendChatMessage } = useContext(ChatContext);
  
  const chatInfo = useChatInfo(chatID);

  document.title = "Chat";

  const isSmallScreen = useMediaQuery('(max-width: 720px)');

  let user_id = localStorage.getItem("user_id");
  let user_name = localStorage.getItem("user_name");

  const messageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [recipientId, setRecipientId] = useState(null);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = () => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) return;

    const newMessage = {
      ID: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      SenderID: user_id,
      Content: trimmedMessage,
      Created_at: new Date().toISOString(),
      Username: user_name,
    };

    // Adiciona imediatamente no chat 
    addMessage(newMessage); // Concatena com as mensagens ja existente

    const message = {
      channel: "messages",
      method: "POST",
      chatId: chatID,
      senderId: user_id,
      content: trimmedMessage,
      Username: user_name,
    };

    sendChatMessage(JSON.stringify(message)); // Envia a mensagem no chat e para o backend
    setMessageText('');
  }

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  useEffect(() => {
    if (chatInfo) {
      if (chatInfo.type === "private"){
        const [usernameA, usernameB] = chatInfo.members;
        const chatName = (user_name == usernameA)? usernameB : usernameA;

        setChatName(chatName);
      } else {
        setChatName(chatInfo.name)
      }
    }
  }, [chatInfo]);

  return(
      <Container>
          {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)}/>}
          {(!isSmallScreen || !isMenuOpen) &&
            <div className="chat-conatiner">
              <div className="chat-header">
                {!isMenuOpen && <MenuIcon src={menu} onClick={() => handleOpenMenu()} title="Open menu"/>}
                <div className="chat-name">
                  {chatName && <ChatIcon src={group} />}
                  <h2>{chatName}</h2>
                </div>
              </div>
              <div className="chat">
                  {Array.isArray(messages) &&
                      messages.filter(message => message.Content && message.Content.trim() !== "").length === 0 ? (
                        <div className="empty-chat-message">Conversa vazia</div>
                    ) : (
                      messages
                        .filter(message => message.Content && message.Content.trim() !== "")
                        .map((message, index) => (
                          <div 
                            className={`message-container ${
                              message.SenderID === user_id ? 'message-mine' : 'received'
                            }`}
                            key={index}
                          >
                            <div className="message-author"><strong>{message.Username}</strong></div>
                            <div className="message-text">{message.Content}</div>
                            <span className="message-time">
                              {new Date(message.Created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
              </div>
              <div className="input-container">
                  <div>
                    <label>
                      <ClipIcon src={clip} title="Select a file"/>
                      <input className="hidden-input" type="file" accept="image/*" ref={fileInputRef} />
                    </label>
                    <input 
                        type="text" 
                        placeholder="Message" 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)} 
                        onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}/>
                  </div>
                  <button onClick={() => handleSubmit()}>
                      <SendIcon src={send} title="Send message"/>
                  </button>
              </div>
            </div>
          }
      </Container>
  );
}

export default Chat;