import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // El contexto de autenticación

// Ruta protegida para verificar permisos
export const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  //console.log('user en ProtectedRoute:', user);
  if (!user) {
    // Si no está autenticado, redirigir al login
    return <Navigate to="/Login" />;
  }

  if (!roles.includes(user.rol)) {
    // Si no tiene los roles necesarios, redirigir a inicio
    return <Navigate to="/Inicio" />;
  }

  // Si está autenticado y tiene permisos, mostrar el componente
  return children;
};
