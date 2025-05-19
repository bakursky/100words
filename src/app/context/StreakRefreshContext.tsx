
'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface StreakRefreshContextProps {
  refreshKey: number;
  triggerRefresh: () => void;
}

const StreakRefreshContext = createContext<StreakRefreshContextProps | undefined>(undefined);

export const StreakRefreshProvider = ({ children }: { children: ReactNode }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <StreakRefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </StreakRefreshContext.Provider>
  );
};

export const useStreakRefresh = (): StreakRefreshContextProps => {
  const context = useContext(StreakRefreshContext);
  if (!context) throw new Error("useStreakRefresh must be used within StreakRefreshProvider");
  return context;
};
