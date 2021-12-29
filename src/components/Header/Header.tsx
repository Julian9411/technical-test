import { MouseEvent, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logoHorizontal from "../../assets/svg/logoHorizontal.svg";

import "./style.css";
import { useReduxDispatch, useReduxSelector } from "../../redux";
import { logAut } from "../../redux/actions/auth";
import { Link } from "react-router-dom";

export const Header = ({
  type,
  transparent = false,
}: {
  type: string;
  transparent?: boolean;
}) => {
  const { auth } = useReduxSelector((state) => state.auth);
  const dispatch = useReduxDispatch();

  const isAuth = auth.id;

  const linksHome = [
    { path: "/", label: "Inicio" },
    { path: "#benefits", label: "Beneficios" },
    isAuth
      ? { path: "/login", label:  "Cerrar Sesión", border: true, button: true }
      : { path: "/login", label: "Login", border: true },
  ];

  const linksAdmin = [
    { path: "/login", label: "Cerrar Sesión", border: true, button: true },
  ];

  const links = type === "primary" ? linksHome : linksAdmin;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className={transparent ? "transparent" : ""}>
      <img src={logoHorizontal} alt="logo" />
      <ul className="menu">
        {links.map((link) => (
          <li className={isAuth ? "border borderAuth" : ""} key={link.path} onClick={() => isAuth ? dispatch(logAut()) : null }>
            {link.button ? (
              link.label
            ) : (
              <Link className={link.border ? "border" : ""} to={link.path}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className="menuMobileContainer">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="menuMobile"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {links.map((link) => (
            <MenuItem key={link.path} onClick={handleClose}>
              <a href={link.path}>{link.label}</a>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </nav>
  );
};
