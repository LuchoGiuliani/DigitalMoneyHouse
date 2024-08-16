import { AuthProvider } from "@/hooks/useAuth";


const { EmailProvider } = require("./emailContext");

const AppProvider = ({ children }) => {
  return (
    <EmailProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </EmailProvider>
  );
};

export default AppProvider;
