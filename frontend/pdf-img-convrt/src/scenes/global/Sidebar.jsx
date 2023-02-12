import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import profilePic from "../../assets/generic_profile.svg";
import useLogout from "../../hooks/useLogout";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { id } = useParams();
  const user = id;
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box display="flex" width="100%" height="100%" zIndex={1}>
      <Box
        height="100%"
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[900]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {/*USER*/}
            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={profilePic}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      backgroundColor: colors.primary[200],
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user}
                  </Typography>
                </Box>
              </Box>
            )}
            {/* MENU ITEMS */}
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              {!isCollapsed && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Menu
                </Typography>
              )}
              <Item
                title="New Form"
                to="/"
                icon={<AddBoxIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="FAQ Page"
                to="faq"
                icon={<HelpOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />{" "}
            </Box>
          </Menu>

          {!isCollapsed ? (
            <Button
              sx={{
                color: colors.primary[100],
                
              }}
              
              onClick={signOut}
              endIcon={<LogoutIcon />}
            >
              Log Out
            </Button>
          ) : (
            <Button
              sx={{
                  color: colors.primary[100],
                  display: "flex",
                  justifyContent: !isCollapsed ? undefined : "center"
                  
              }}
              
              onClick={signOut}
                endIcon={<LogoutIcon sx={{
                  position: "relative",
                  right: !isCollapsed ? undefined : "5px"
              }} />}
            ></Button>
          )}
        </ProSidebar>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Sidebar;
