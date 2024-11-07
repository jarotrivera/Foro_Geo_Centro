import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Layout from './components/Layout'; 
import Login from './views/Login';
import Registro from './views/Registro';
import AreasComunes from './views/AreasComunes';
import TusVentas from './views/TusVentas';
import Estacionamiento from './views/Estacionamiento';
import VistaHacerUnPost from './views/VistaHacerUnPost';
import VistaHacerUnaVenta from './views/VistaHacerUnaVenta';
import PaginaInicial from './views/PaginaInicial';
import TusPreguntas from './views/TusPreguntas';
import PaginaVentas from './views/PaginaVentas';
import GastosComunes from './views/GastosComunes';
import AdminGastos from './views/AdminGastos';
import AdminDashboard from './views/AdminDashboard';  
import AdminEliminarUser from './views/AdminEliminarUser';
import AdminEliminarPost from './views/AdminEliminarPost';
import AdminEliminarVenta from './views/AdminEliminarVenta';

// Función para decodificar el token y obtener el rol
function decodeTokenRole(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload en base64
    return payload.role; // Retorna el rol del usuario si existe
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
}

function App() {
  const token = localStorage.getItem('token');
  const userRole = token ? decodeTokenRole(token) : null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirección a registro */}
        <Route path="/" element={<Layout userRole={userRole} />}> {/* Pasar el rol como prop */}
          <Route path="login" element={<Login />} />   
          <Route path="registro" element={<Registro />} />
          <Route path="areas-comunes" element={<AreasComunes />} />
          <Route path="tusventas" element={<TusVentas />} />
          <Route path="estacionamiento" element={<Estacionamiento />} />
          <Route path="vistahacerunpost" element={<VistaHacerUnPost />} />
          <Route path="vistahacerunaventa" element={<VistaHacerUnaVenta />} />
          <Route path="paginainicial" element={<PaginaInicial />} />
          <Route path="tuspreguntas" element={<TusPreguntas />} />
          <Route path="paginaventas" element={<PaginaVentas />} />
          <Route path="gastoscomunes" element={<GastosComunes />} />
          <Route path="admin-gastos" element={<AdminGastos />} />
          <Route path="admindashboard" element={<AdminDashboard />} /> {/* Nueva ruta */}
          <Route path="admin-eliminar-user" element={<AdminEliminarUser />} />
          <Route path="admin-eliminar-post" element={<AdminEliminarPost />} />
          <Route path="admin-eliminar-venta" element={<AdminEliminarVenta />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
