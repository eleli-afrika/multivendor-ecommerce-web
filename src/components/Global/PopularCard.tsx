import { useNavigate } from "react-router-dom";
import { productCard } from "../../interface/common";

function Productcard({ image, name, price, id }: productCard) {
  const navigate = useNavigate();

  return (
    <div className=" lg:h-[300px] sm:w-[200px]   w-[45vw] md:w-[210px] lg:w-[210px] xl:w-[210px] px-2 mb-4 ">
      <div
        className="flex h-full flex-col lg:flex-col rounded-[8px] sm:bg-white border-gray-300 relative md:hover:scale-105 duration-300"
        onClick={() => navigate(`/ad_info/${id}`)}
      >
        <img
          className="w-full h-[55%] lg:h-3/5 lg:w-full object-cover object-center lg:object-cover border-none md:border border-red-500"
          src={image}
          alt={name}
          style={{
            borderTopRightRadius: "0.75rem",
            borderTopLeftRadius: "0.75rem",
          }}
        />
        <div className="flex flex-col justify-between py-2 lg:p-2">
          <div className="flex flex-row justify-between text-md">
            {/* Additional information */}
          </div>
          <div>
            <h1 className="text-[15px] text-black-main lg:text-md capitalize h-[40px] line-clamp-2 leading-tight overflow-y-hidden">
              {name}
            </h1>
          </div>
          <p className="text-[18px] font-bold text-black-main mt-2">
            Ksh: {price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
