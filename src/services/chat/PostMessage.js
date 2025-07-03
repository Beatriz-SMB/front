import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';

export function usePostMessage({ chatId, senderId, content }) {
  const [status, setStatus] = useState(null);

  const {
    sendMessage,
    socketData,
    connectionStatus,
  } = useSocket('');

  useEffect(() => {
    if (chatId && senderId && content && connectionStatus === 'Conectado') {
      const msg = {
        channel: 'messages',
        method: 'POST',
        chatId,
        senderId,
        content,
      };
      sendMessage(JSON.stringify(msg));
    }
  }, [chatId, senderId, content, connectionStatus]);

  useEffect(() => {
    if (socketData?.channel === 'messages' && socketData?.method === 'POST') {
      if (socketData?.status === 'success') {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
  }, [socketData]);

  return status;
}
