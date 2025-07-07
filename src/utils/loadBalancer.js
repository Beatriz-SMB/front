const serverEnv = import.meta.env.VITE_SERVERS || ""; 

const servers = serverEnv.split(",").map(url => url.trim());

let currentServer = null;

// Considera ativo o servidor que responder a /health
async function checkServerHealth(url) {
  try {
    const response = await fetch(`${url}/health`, { method: "GET", cache: "no-store" });
    return response.ok;
  } catch (err) {
    return false;
  }
}

// Sorteia entre os servidores ativos
async function selectAvailableServer() {
  const healthyServers = [];
  
  for (const server of servers) {
    const healthy = await checkServerHealth(server);
    if (healthy) {
      healthyServers.push(server);
    }
  }

  if (healthyServers.length > 0) {
    const randomIndex = Math.floor(Math.random() * healthyServers.length);
    return healthyServers[randomIndex];
  }

  return null;
}

// Inicia e mantém a conexão com servidor válido
async function initServerMonitor(onChange) {
  currentServer = await selectAvailableServer();
  if (onChange && currentServer) onChange(currentServer);

  setInterval(async () => {
    const healthy = await checkServerHealth(currentServer);
    if (!healthy) {
      const newServer = await selectAvailableServer();
      if (newServer && newServer !== currentServer) {
        currentServer = newServer;
        console.log("New server available: ",currentServer)
        if (onChange) onChange(currentServer);
      }
    }
  }, 2000); // verifica a cada 2 segundos
}

// Exporta a URL ativa
function getCurrentServer() {
  return currentServer;
}

export { initServerMonitor, getCurrentServer };
