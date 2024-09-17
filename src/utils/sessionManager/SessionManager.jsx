"use client"
import { useIdleTimer } from 'react-idle-timer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const SessionManager = ({ children }) => {
  const { login } = useAuth() || {}; 
  const router = useRouter();

  
  const handleOnIdle = () => {
    if (login) {
      logoutUser("inactividad");
    }
  };


  useEffect(() => {
    const tokenExpirationTimer = setTimeout(() => {
      if (login) {
        logoutUser("expiracion");
      }
    }, 1 * 60 * 1000); 

    return () => clearTimeout(tokenExpirationTimer);
  }, [login]);


  const logoutUser = (reason) => {  
    if (login) {
      logout(); 
    }
    router.push('/'); 
    toast(`Tu sesión ha expirado por ${reason}.`, { duration: 5000 });
  };

  const { start } = useIdleTimer({
    timeout: 1 * 60 * 1000,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  useEffect(() => {
    start();
  }, [start]);

  return <>{children}</>;
};

export default SessionManager;
