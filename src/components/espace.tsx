import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

type TSpace = {
  name: string;
  imageUrl: string;
  id: string;
};

function Espace() {
  const getAllSpaces = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/spaces");
    return res.data;
  };

  const { isLoading, error, data } = useQuery("getAllSpaces", getAllSpaces);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <p>Sorry something went wrong</p>;
  }
  return (
    <div className="w-full flex flex-col items-center">
      <hr className="bg-vert h-1 w-full top-0" />
      <div className=" w-2/6 text-black font-bold">Mes espaces</div>
      <hr className="bg-bleu h-1 w-1/3 rounded-full" />
      {data.map((space: TSpace) => (
        <div
          key={space.id}
          className="flex justify-center items-center my-2 w-2/3"
        >
          <p className="absolute text-white font-bold text-sm z-20 ">
            {space.name}
          </p>
          <div className="w-full relative z-10">
            <img
              src={space.imageUrl}
              alt={`Logo ${space.name}`}
              className="rounded-lg object-center h-16 w-full "
            />
            <div className="bg-bleu h-16 w-full absolute z-20 top-0 left-0 mix-blend-hard-light opacity-[0.85] rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Espace;
