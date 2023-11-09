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
        <div className="w-[45vw]  lg:w-80 lg:h-[21rem] h-[auto] mb-2 cursor-pointer">
            <div
                className="flex h-full py-1 flex-col max-w-sm rounded-lg bg-stone-50 radius-2xl  border-gray-300 mb-2 price relative lg:hover:bg-green-100 hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
                // onClick={() => console.log(id)}
            >
                <img
                    className="rounded-lg w-full h-3/3 lg:h-3/5 lg:w-full object-contain  lg:object-cover bg-gray-light "
                    src={image}
                />
                <div className="px-3 py-2 w-2/3">
                    <div className="flex flex-row justify-between text-md">
                        <p className="text-green-400 truncate text-[10px] lg:text-md ">{seller} </p>
                    </div>
                    <h1 className="text-slate-700 text-xs lg:text-md font-bold uppercase truncate">
                        {name}
                    </h1>
                    <p className="text-stone-500 text-sm font-bold">Ksh: {price}</p>
                    <div className="flex flex-row items-center justify-start">
                        <p className="text-slate-400 text-xs"> rated 4.5 </p>
                        <p className="text-xs text-slate-400 my-2">(of 200 reviews)</p>
                    </div>

                    <button className="px-4 bg-orange-600 text-sm rounded-[0.25rem] text-white">
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Productcard;
