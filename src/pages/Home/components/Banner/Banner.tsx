import exampleImage from "../../../../assets/img/imageExample.png";
import "./style.css";

export const Banner = () => (
  <div className="containerBanner">
    <img src={exampleImage} alt="exampleImage" />
    <p className="textBanner">
      Trabajamos para <br />
      <strong>Convertir ideas</strong> en <br />
      <strong>productos.</strong>
    </p>
  </div>
);
