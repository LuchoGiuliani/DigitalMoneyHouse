import { AuthProvider } from "@/hooks/useAuth";
import { UserProvider } from "./userContext";
import { ActivityProvider } from "./activityContext";

const { EmailProvider } = require("./emailContext");

const AppProvider = ({ children }) => {
  return (
    <EmailProvider>
      <ActivityProvider>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </ActivityProvider>
    </EmailProvider>
  );
};

export default AppProvider;
