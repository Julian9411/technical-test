import { useRef } from "react";
import Slider from "react-slick";
import Arrow from "./Arrow";
import benefits from "./const";

import "./style.css";

export const Benefits = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    nextArrow: <Arrow onClick={() => sliderRef?.current?.slickNext?.()} />,
    prevArrow: <Arrow onClick={() => sliderRef?.current?.slickPrev?.()} left />,
  };

  return (
    <div className="containerBenefits" id="benefits">
      <p className="textBenefits">
        Entre los <span>beneficios</span> que <br />
        <strong>ofrecemos</strong> se encuentran.
      </p>
      <div className="containerSlider">
        <Slider {...settings} ref={sliderRef}>
          {benefits.map((benefit) => (
            <div className="containerSlide">
              <div className="containerIcon">
                <img src={benefit.icon} alt={benefit.label} />
              </div>
              <p>{benefit.label}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
