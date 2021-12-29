import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./style.css";

const Arrow = ({ onClick, left }: { onClick: () => void; left?: boolean }) => (
  <div
    onClick={onClick}
    className={`arrowContainer ${left && "arrowContainerLeft"}`}
  >
    <ArrowForwardIosIcon className="arrow" />
  </div>
);

export default Arrow;
