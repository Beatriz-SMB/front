import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { getCurrentServer } from '../utils/loadBalancer';

function toWebSocketUrl(url) {
  if (!url) return null;
  if (url.startsWith('https://')) return url.replace('https://', 'wss://');
  if (url.startsWith('http://')) return url.replace('http://', 'ws://');
  return url;
}

export const useChatSocket = (chatID, userID) => {

  const [socketChat, setSocketChat] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!chatID || !userID) return;
    const server = getCurrentServer();
    if (server) {
      const wsUrl = toWebSocketUrl(server) + '/ws?' + 'chatID=' + chatID + '&userID=' + userID;
    // const wsUrl = 'ws://localhost:8080' + '/ws?' + 'chatID=' + chatID + '&userID=' + userID;
      setUrl(wsUrl);
    }
  }, [chatID, userID]);

  const options = {
    // onOpen: () => console.log(`Connected to + chatID=${chatID} + '&userID=' + ${userID}`),
    onMessage: (message) => {
      if (!message) return;
      const data = JSON.parse(message.data);
      if (data) {
        setSocketChat(data);
      }
    },
    onError: (event) => console.error(event),
    onClose: (close) => console.log(close),
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
    shouldConnect: Boolean(url), 
  };

  const {
    sendMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(url ?? '', options)

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Conectando...',
    [ReadyState.OPEN]: 'Conectado',
    [ReadyState.CLOSING]: 'Fechando...',
    [ReadyState.CLOSED]: 'Desconectado',
    [ReadyState.UNINSTANTIATED]: 'Não iniciado',
  }[readyState];

  return {
    sendChatMessage: sendMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    connectionStatus,
    socketChat,
  };
};