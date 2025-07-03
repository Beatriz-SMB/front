import { createContext, useContext, useState } from "react";

export const ReloadContext = createContext();

export const ReloadProvider = ({ children }) => {
  const [reloadGroups, setReloadGroups] = useState(false);

  return (
    <ReloadContext.Provider value={{ reloadGroups, setReloadGroups }}>
      {children}
    </ReloadContext.Provider>
  );
};

export const useReload = () => useContext(ReloadContext);