import { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  return (
    <div>
      <GlobalContext.Provider value={user}>{children}</GlobalContext.Provider>
    </div>
  );
};
