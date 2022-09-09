


import AuthNavigation from "./routes/AuthNavigation";
import MainNavigation from "./routes/MainNavigation";
import { useData } from "./context";

export default function MainApp() {
  const {user} = useData();
  if (!user) return <AuthNavigation />
  return <MainNavigation />
}