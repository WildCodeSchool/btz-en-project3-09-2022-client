import { useQuery } from "@tanstack/react-query";
import React from "react";
import Slider, { Settings } from "react-slick";
import { useAuth } from "../../context/UserContext";
import { categoryFetcher } from "../../utils/fetcher";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCategory from "./ImageCategory";
import CTA from "../structure/CTA";

function CarouselCategory() {
  const { user } = useAuth();
  const { isLoading, error, data } = useQuery(
    ["dataCategoriesByUserAuth", user?.id],
    () => user && categoryFetcher.getAll()
  );

  if (isLoading) {
    <div>loading..</div>;
  }

  if (error) {
    <div>something wrong just happened..</div>;
  }
  const settings: Settings = {
    dots: true,
    infinite: false,
    centerMode: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    rows: 2,
    speed: 500,
  };

  return (
    <div className="bg-background-enedis w-full flex flex-col items-center justify-center space-y-3 py-2 lg:flex-row-reverse lg:px-6 lg:space-y-0 lg:py-0 ">
      <Slider {...settings} className="w-10/12 lg:w-2/3">
        {data?.map((category) => (
          <ImageCategory category={category} />
        ))}
      </Slider>
      <div className="pb-2 md:py-5 lg:h-full lg:mr-10">
        <CTA text="Je crée une catégorie" action={() => {}} />
      </div>
    </div>
  );
}

export default CarouselCategory;
