/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCategory from "./ImageCategory";
import { TSpace } from "../../../../types/main";

interface IProps {
  dataSpace: TSpace;
}

function CarouselCategory({ dataSpace }: IProps) {
  const { categories } = dataSpace;

  const settings: Settings = {
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    rows: 2,
    speed: 500,
  };

  return (
    <div className="w-11/12 flex flex-col items-center justify-start space-y-3 py-2 lg:flex-row-reverse lg:px-6 lg:space-y-0 lg:py-0 ml-2">
      <Slider {...settings} className="w-full">
        {categories
          ?.filter(
            (category) =>
              category.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") !== "general"
          )
          .map((category) => (
            <ImageCategory category={category} />
          ))}
      </Slider>
    </div>
  );
}

export default CarouselCategory;
