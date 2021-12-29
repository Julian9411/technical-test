import { useState } from "react";
import { Header } from "../../components";
import { Banner, Benefits, AboutUs, Footer } from "./components";
import logoName from "../../assets/svg/logoName.svg";

import "./style.css";

export const Home = () => {
  const [scroll, setScroll] = useState(0)
  window.onscroll = function () {
    setScroll(window.scrollY);
  };
  return (
    <div className="homeContainer">
      <div className="hero">
        <Header type="primary" transparent={scroll <= 10} />
        <div className="textHero">
          <p>
            Bienvenido a tu <br />
            <strong>Entrevista Tecnica</strong> en <br />
          </p>
          <img src={logoName} alt="Name company" />
        </div>
      </div>
      <Banner />
      <Benefits />
      <AboutUs />
      <Footer />
    </div>
  );
};
