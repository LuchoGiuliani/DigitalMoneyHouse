import { AuthProvider } from "@/hooks/useAuth";
import { UserProvider } from "./userContext";


const { EmailProvider } = require("./emailContext");

const AppProvider = ({ children }) => {
  return (
    <EmailProvider>
    <AuthProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </AuthProvider>
  </EmailProvider>
  );
};

export default AppProvider;
