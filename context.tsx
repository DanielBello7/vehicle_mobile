


import React, { useState, useContext } from "react";
import { UserDataType } from './global.types';
import { DARK_THEME, LIGHT_THEME, THEME_TYPE } from './constants';

type ContextProps = {
  children: React.ReactNode
}

type ContextDataType = {
  user: UserDataType | null,
  setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>,

  theme: THEME_TYPE,
  setTheme: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = React.createContext({} as ContextDataType);

function useData() {
  return useContext(Context);
}

function ContextProvider(props: ContextProps) {
  const [user, setUser] = useState<UserDataType | null>(null);

  const [isDarkTheme, setTheme] = useState(false);

  return (
  <Context.Provider value={{
    user,
    setUser,

    theme: isDarkTheme ? DARK_THEME : LIGHT_THEME,
    setTheme
  }}>
    {props.children}
  </Context.Provider>
  );
}

export { ContextProvider, useData }