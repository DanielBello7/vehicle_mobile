import { REACT_APP_LIVE_API, REACT_APP_LOCAL_API } from '@env';
import React, { useState, useContext } from "react";
import Axios, { AxiosInstance } from 'axios';
import { UserDataType } from './global.types';
import { 
  DARK_THEME, 
  LIGHT_THEME, 
  THEME_TYPE 
} from './constants';

type ContextProps = {
  children: React.ReactNode
}

type ContextDataType = {
  user: UserDataType | null,
  setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>,

  theme: THEME_TYPE,
  setTheme: React.Dispatch<React.SetStateAction<boolean>>,

  data: string,
  setData: React.Dispatch<React.SetStateAction<string>>,

  hasData: boolean,
  setHasData: React.Dispatch<React.SetStateAction<boolean>>,

  axios: AxiosInstance,
  baseURL: string
}

const Context = React.createContext({} as ContextDataType);

function useData() {
  return useContext(Context);
}

function ContextProvider(props: ContextProps) {

  // const baseURL = REACT_APP_LOCAL_API as string;

  const baseURL = REACT_APP_LIVE_API as string;

  const axios = Axios.create({baseURL: baseURL, withCredentials: true});

  const [user, setUser] = useState<UserDataType | null>(null);

  const [isDarkTheme, setTheme] = useState(false);

  const [data, setData] = useState("");

  const [hasData, setHasData] = useState(false);

  return (
  <Context.Provider value={{
    user,
    setUser,

    theme: isDarkTheme ? DARK_THEME : LIGHT_THEME,
    setTheme,

    data,
    setData,

    hasData,
    setHasData,
    
    axios,
    baseURL
  }}>
    {props.children}
  </Context.Provider>
  );
}

export { ContextProvider, useData }