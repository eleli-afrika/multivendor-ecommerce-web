import { useNavigate } from "react-router-dom";
import { productCard } from "../../interface/common";
// import { BsBookmarkPlus, BsCloudDownload, BsWhatsapp } from "react-icons/bs";
// import { PiShareFatLight } from "react-icons/pi";
// import { AiOutlineComment, AiOutlineEye, AiOutlinePhone } from "react-icons/ai";
// import { MdOutlineEmail, MdOutlineFavoriteBorder } from "react-icons/md";

function Productcard({
  image,
  name,
  price,
  seller,
  // description,
  id,
}: productCard) {
  const navigate = useNavigate();
  return (
    <div
      className="max-w-sm rounded-lg bg-stone-100 radius-2xl h-fit mb-2  border border-gray-300 responsive-item"
      onClick={() => navigate(`/ad_info/${id}`)}
    >
      <img
        className="rounded-lg h-3/5 w-full object-cover img-responsive "
        src={image}
      />
      <div className="px-3 py-2">
        <div className="flex flex-row justify-between text-md">
          <h1 className="text-slate-700 font-bold uppercase truncate">
            {name}
          </h1>
          <p className="text-sm text-green-400 truncate ">{seller} </p>
        </div>
        <p className="text-stone-500 font-bold">Ksh: {price}</p>
        <div className="flex flex-row items-center justify-start">
          <p className="text-slate-400 text-xs"> rated 4.5 </p>
          <p className="text-xs text-slate-400 my-2">(of 200 reviews)</p>
        </div>
        {/* <p className="line-clamp-3 leading- pr-10 text-slate-500 text-xs">
          {description}
        </p> */}
        {/* <div className="mt-3 flex flex-row gap-2 flex-wrap">
          <button className="p-2 rounded-full bg-gray-200">
            <BsCloudDownload className="bg-gray-300 rounded-2xl " />
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <PiShareFatLight className="bg-gray-300 rounded-2xl" />
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <AiOutlineEye className="bg-gray-300 rounded-2xl" />
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <MdOutlineFavoriteBorder className="bg-gray-300 rounded-2xl" />
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <BsBookmarkPlus className="bg-gray-300 rounded-2xl" />
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <AiOutlineComment className="bg-gray-300 rounded-2xl" />
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <BsWhatsapp className="bg-gray-300 rounded-2xl" />
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <AiOutlinePhone className="bg-gray-300 rounded-2xl" />
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <MdOutlineEmail className="bg-gray-300 rounded-2xl" />
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Productcard;
