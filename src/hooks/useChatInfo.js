import { useEffect, useState, useContext} from 'react';
import { WebSocketContext } from '../context/WebSocketContext';

export function useChatInfo(chatId) {
  const [chatInfo, setChatInfo] = useState(null);

  const {
    sendMessage,
    socketData,
    connectionStatus,
  } = useContext(WebSocketContext);

  // Envia o pedido de informações do chat
  useEffect(() => {
    if (connectionStatus === 'Conectado' && chatId) {
      const msg = {
        channel: 'chat',
        method: 'GET-info',
        chatId: chatId,
      };
      sendMessage(JSON.stringify(msg));
    }
  }, [connectionStatus, chatId]);

  // Escuta a resposta do servidor
  useEffect(() => {
    if (socketData?.chat_id === chatId) {
      setChatInfo(socketData);
    }
  }, [socketData, chatId]);

  return chatInfo;
}
