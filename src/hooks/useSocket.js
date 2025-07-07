import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { getCurrentServer, initServerMonitor } from '../utils/loadBalancer';

function toWebSocketUrl(url) {
  if (!url) return null;
  if (url.startsWith('https://')) return url.replace('https://', 'wss://');
  if (url.startsWith('http://')) return url.replace('http://', 'ws://');
  return url;
}

export const useSocket = (path = '') => {

  const [socketData, setSocketData] = useState(null);
  const [url, setUrl] = useState(null);

  // useEffect(() => {
  //   const server = getCurrentServer();
  //   if (server) {
  //     const wsUrl = toWebSocketUrl(server) + '/ws' + path;
  //     setUrl(wsUrl);
  //   }
  // },[]);
  useEffect(() => {
    let cleanup = () => {};
    
    initServerMonitor((server) => {
      if (server) {
        const wsUrl = toWebSocketUrl(server) + '/ws' + path;
        console.log("WebSocket URL atualizada:", wsUrl);
        setUrl(wsUrl);
      }
    });

    return () => cleanup(); // se quiser limpar algo no futuro
  }, [path]);

  const options = {
    // onOpen: () => console.log(`Connected to App WS 🚀`),
    onMessage: (message) => {
      if (!message) return;
      const data = JSON.parse(message.data);
      if (data) {
        console.log("RECEBIDO DO SOCKET:", data);
        setSocketData(data);
      }
    },
    onError: (event) => console.error(event),
    onClose: (close) => console.log(close),
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: 2000,
    shouldConnect: Boolean(url), // importante: conecta só se URL existe
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
    sendMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    connectionStatus,
    socketData,
  };
};
