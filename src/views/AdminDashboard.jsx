import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Person as PersonIcon, Build as BuildIcon, Delete as DeleteIcon, MonetizationOn as MonetizationOnIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import Sidebar from '../components/Menu';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <Sidebar /> {/* Menú lateral */}
      <div className="admin-dashboard-content">
        <h2>Bienvenido, Admin</h2>
        <p className="modules-title">Módulos Disponibles</p>
        <div className="modules-grid">
          <div className="module-card" onClick={() => navigate('/admin-gastos')}>
            <MonetizationOnIcon className="module-icon" />
            <p className="module-title">Gastos Comunes</p>
            <button className="module-button">Ir a Gastos</button>
          </div>
          <div className="module-card" onClick={() => navigate('/admin-eliminar-user')}>
            <PersonIcon className="module-icon" />
            <p className="module-title">Eliminar Usuarios</p>
            <button className="module-button">Ir a Usuarios</button>
          </div>
          <div className="module-card" onClick={() => navigate('/admin-eliminar-post')}>
            <DeleteIcon className="module-icon" />
            <p className="module-title">Eliminar Publicaciones</p>
            <button className="module-button">Ir a Publicaciones</button>
          </div>
          <div className="module-card" onClick={() => navigate('/admin-eliminar-venta')}>
            <BuildIcon className="module-icon" />
            <p className="module-title">Eliminar Ventas</p>
            <button className="module-button">Ir a Ventas</button>
          </div>
          <div className="module-card" onClick={() => navigate('/registro')}>
            <PersonAddIcon className="module-icon" />
            <p className="module-title">Registro Usuarios</p>
            <button className="module-button">Ir a Registro</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
