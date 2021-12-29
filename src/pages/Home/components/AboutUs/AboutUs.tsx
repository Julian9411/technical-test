import InstagramIcon from "../../../../assets/svg/instagram.svg";
import "./style.css";

export const AboutUs = () => (
  <div className="aboutUsContainer">
    <p>
      Gracias por <span className="gradient">completar el ejercicio</span>
      <br />
      <span className="textSecondary">Te invitamos a ver más información.</span>
    </p>
    <div className="containerButtonsFooter">
      <a
        className="iconLink"
        href="https://www.instagram.com/waconomads/"
        target="_blank"
      >
        <img src={InstagramIcon} alt="Instagram" />
      </a>
      <a
        href="https://wacoservices.com/"
        target="_blank"
        className="buttonLink"
      >
        Conocer más
      </a>
    </div>
  </div>
);
