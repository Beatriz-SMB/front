import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';

export function useChatInfo(chatId) {
  const [chatInfo, setChatInfo] = useState(null);

  const {
    sendMessage,
    socketData,
    connectionStatus,
  } = useSocket('');

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
