import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Logo from "../../assets/svg/logoHorizontal.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { loginFacebook, loginWithEmail, loginGoogle } from "../../authMethods";
import { useNavigate } from "react-router-dom";
import { useReduxDispatch } from "../../redux";

import "./style.css";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();

  return (
    <div className="container">
      <div className="containerLogin">
        <img src={Logo} alt="Logo" />
        <TextField
          label="Email"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextField
          label="Password"
          variant="standard"
          onChange={(e) => setPass(e.target.value)}
          type="password"
        />
        <Button
          variant="contained"
          onClick={() => loginWithEmail({ email, pass, navigate, dispatch })}
        >
          Entrar
        </Button>
        <div className="loginContainerSocialNetworks">
          <Button
            variant="contained"
            onClick={() => loginFacebook(navigate, dispatch)}
          >
            <FacebookIcon /> Entrar con Facebook
          </Button>
          <Button
            variant="contained"
            onClick={() => loginGoogle(navigate, dispatch)}
          >
            <GoogleIcon /> Entrar con Google
          </Button>
        </div>
      </div>
    </div>
  );
};
