import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  QuestionAnswer as QuestionAnswerIcon,
  ShoppingCart as ShoppingCartIcon,
  DirectionsCar as DirectionsCarIcon,
  ExitToApp as ExitToAppIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Sidebar = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // Obtener el token del localStorage
  const token = localStorage.getItem("token");

  // Función para obtener el rol del usuario desde el backend
  useEffect(() => {
    const fetchUserRole = async () => {
      if (token) {
        try {
          const response = await fetch(
            "https://forogeocentro-production.up.railway.app/api/auth/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setUserRole(data.role);
          } else {
            console.error("Error al obtener el rol del usuario:", response.status);
            handleLogout(); // Si el token es inválido, cerrar sesión
          }
        } catch (error) {
          console.error("Error al obtener el rol del usuario:", error);
        }
      }
    };
    fetchUserRole();
  }, [token]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Navegación
  const goToEstacionamiento = () => navigate("/estacionamiento");
  const goToPreguntas = () => navigate("/paginainicial");
  const goToVentas = () => navigate("/paginaventas");
  const goToTusVentas = () => navigate("/tusventas");
  const goToTusPreguntas = () => navigate("/tuspreguntas");
  const goToAdminDashboard = () => navigate("/admindashboard");

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(""); // Limpiar el rol al cerrar sesión
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""} ${className}`}>
      <IconButton onClick={toggleSidebar} className="menu-toggle-btn">
        <MenuIcon />
      </IconButton>
      <div className="sidebar-content">
        <div className={`title16 ${!isOpen ? "hidden" : ""}`}>MENU</div>
        <List>
          {/* Preguntas */}
          <ListItem button onClick={goToPreguntas}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Preguntas" />}
          </ListItem>

          {/* Ventas */}
          <ListItem button onClick={goToVentas}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Ventas" />}
          </ListItem>

          {/* Estacionamiento */}
          <ListItem button onClick={goToEstacionamiento}>
            <ListItemIcon>
              <DirectionsCarIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Estacionamiento" />}
          </ListItem>

          {/* Vista Admin: Mostrar solo si el rol es "admin" */}
          {userRole === "admin" && (
            <ListItem button onClick={goToAdminDashboard}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              {isOpen && <ListItemText primary="Vista Admin" />}
            </ListItem>
          )}
        </List>

        <div className={`title17 ${!isOpen ? "hidden" : ""}`}>
          NAVEGADOR PERSONAL
        </div>
        <List>
          {/* Tus Ventas */}
          <ListItem button onClick={goToTusVentas}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Tus Ventas" />}
          </ListItem>

          {/* Tus Preguntas */}
          <ListItem button onClick={goToTusPreguntas}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Tus Preguntas" />}
          </ListItem>

          {/* Cerrar Sesión */}
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Cerrar Sesión" />}
          </ListItem>
        </List>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
