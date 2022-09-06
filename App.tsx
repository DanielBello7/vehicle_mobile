


import { ContextProvider } from "./context";
import MainApp from "./MainApp";

export default function App() {
  return (
  <ContextProvider>
  <MainApp />
  </ContextProvider>
  );
}