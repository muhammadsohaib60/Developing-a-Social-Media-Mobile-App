import React, { createContext, useContext } from "react";

const GlobalContext = createContext({} as any);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: any) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
