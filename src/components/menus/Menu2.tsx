import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Sidebar from "./Sidebar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MeetingRoomSharpIcon from "@mui/icons-material/MeetingRoomSharp";
import VpnKeySharpIcon from "@mui/icons-material/VpnKeySharp";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
import useAuth from "../../hooks/useAuth";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import GpsFixedTwoToneIcon from '@mui/icons-material/GpsFixedTwoTone';
import ShareLocationTwoToneIcon from '@mui/icons-material/ShareLocationTwoTone';
import TaxiAlertTwoToneIcon from '@mui/icons-material/TaxiAlertTwoTone';

function Menu2() {
  const { auth, cerrarSesion } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ color: "#FFFFFF", backgroundColor: "#083344" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IDFleet
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex", alignItems: "center" },
            }}
          >
            
            <Sidebar />
       
       <div className="flex gap-2">
       <div className="hover:bg-cyan-800  bg-cyan-900 p-2  rounded-lg">
              <Tooltip title="I N I C I O">
                <Link to="/admin">
                  <HomeTwoToneIcon />
                </Link>
              </Tooltip>
            </div> 
        {/*     <div className="hover:bg-cyan-800  bg-cyan-900 p-2  rounded-lg">
              <Tooltip title="W I A L O N">
                <Link to="/admin/wialon">
                  <GpsFixedTwoToneIcon />
                </Link>
              </Tooltip>
            </div> */}
            <div className="hover:bg-cyan-800  bg-cyan-900 p-2  rounded-lg">
              <Tooltip title="TABLERO WIALON">
                <Link to="/admin/tablero-wialon">
                  <ShareLocationTwoToneIcon />
                </Link>
              </Tooltip>
            </div>

            <div className="hover:bg-cyan-800  bg-cyan-900 p-2  rounded-lg">
              <Tooltip title="TABLERO WIALON">
                <Link to="/admin/tablero-tablet">
                  <TaxiAlertTwoToneIcon />
                </Link>
              </Tooltip>
            </div>
       </div>

        
          </Box>

          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontSize: 17,
            }}
          >
            {auth.nom_usuario}
          </Typography>

          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            IDFleet
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Modificar Perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link
                to="/admin/actualizar-password"
                className="block px-4 font-bold py-2 text-sm text-blue-950 hover:bg-blue-200"
              >
                Cambiar Contraseña
              </Link>

              <Link
                className="block px-4 font-bold py-2 text-sm text-blue-950 hover:bg-blue-200"
                onClick={cerrarSesion}
                to="/"
              >
                Cerrar Sesion
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Menu2;
