// import React from "react";
import { Accordions } from "../data/slider";

const Popular = () => {
  return (
    <div className="">
      <p className="text-xl font-semibold  text-gray-700 mt-2 px-2"> </p>

      <div className="responsive">
        {Accordions.map((image) => (
          <div className="responsive-item ">
            <img src={image.img} alt="" className=" img-responsive" />
            <div className=" bg-gray-light p-4">
              <p>Image name</p>
              <p>image Price </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
