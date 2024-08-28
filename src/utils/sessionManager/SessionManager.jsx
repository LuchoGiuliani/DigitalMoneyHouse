"use client"
import { useIdleTimer } from 'react-idle-timer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const SessionManager = ({ children }) => {
  const { login } = useAuth() || {}; // Maneja el caso cuando useAuth() puede ser undefined
  const router = useRouter();

  // Configura el temporizador de inactividad (10 minutos)
  const handleOnIdle = () => {
    if (login) {
      logoutUser("inactividad");
    }
  };

  // Configura el temporizador de expiración del token (30 minutos)
  useEffect(() => {
    const tokenExpirationTimer = setTimeout(() => {
      if (login) {
        logoutUser("expiracion");
      }
    }, 1 * 60 * 1000); // 30 minutos en milisegundos

    return () => clearTimeout(tokenExpirationTimer);
  }, [login]);

  // Lógica para cerrar sesión
  const logoutUser = (reason) => {  
    if (login) {
      logout(); // Método para desloguear al usuario
    }
    router.push('/'); // Redirigir a la página de inicio
    toast(`Tu sesión ha expirado por ${reason}.`, { duration: 5000 });
  };

  const { start } = useIdleTimer({
    timeout: 1 * 60 * 1000, // 10 minutos en milisegundos
    onIdle: handleOnIdle,
    debounce: 500,
  });

  useEffect(() => {
    start(); // Iniciar el temporizador de inactividad
  }, [start]);

  return <>{children}</>;
};

export default SessionManager;
