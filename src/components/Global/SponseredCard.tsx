import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

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
        <div className="relative w-72 h-96  cursor-pointer">
            <div className="absolute top-0 left-0 z-10 ">
                <button className="bg-blue-800 text-sm  text-white px-2 py-1 rounded ">
                    Sponsored
                </button>
            </div>
            <div
                className="max-w-sm rounded-lg bg-stone-50 radius-2xl  border-gray-300 h-96 mb-2 price relative hover:bg-green-100 hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img className="rounded-lg h-3/5 w-full object-cover bg-gray-light " src={image} />
                <div className="px-3 py-2">
                    <div className="flex flex-row justify-between text-md">
                        <p className="text-sm text-green-400 truncate ">{seller} </p>
                    </div>
                    <h1 className="text-slate-700 font-bold uppercase truncate">{name}</h1>
                    <p className="text-stone-500 font-bold">Ksh: {price}</p>
                    <div className="flex flex-row items-center justify-start">
                        <p className="text-slate-400 text-xs"> rated 4.5 </p>
                        <p className="text-xs text-slate-400 my-2">(of 200 reviews)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productcard;
