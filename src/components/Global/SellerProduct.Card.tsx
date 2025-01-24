import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({
    image,
    name,
    price,
   
    id,
}: productCard) {
    const navigate = useNavigate();
    return (
        <div className="w-full lg:w-72 lg:h-96 h-36 mb-2 cursor-pointer">
            <div
                className="flex h-full py-1 flex-row lg:flex-col max-w-sm rounded-lg bg-stone-50 radius-2xl  border-gray-300 mb-2 price relative hover:bg-green-100 hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img
                    className="rounded-lg w-1/3 h-full lg:h-3/5 lg:w-full object-cover bg-gray-light "
                    src={image}
                  
                />
                <div className="px-3 py-2 w-2/3">
                    <div className="flex flex-row justify-between text-md">
                      
                    </div>
                    <h1 className="text-slate-700 text-xs lg:text-md font-bold uppercase">
                        {name}
                    </h1>
                    <p className="text-stone-500 text-sm font-bold">Ksh: {price}</p>

                    <button className="p-2 bg-orange-600 rounded-[0.25rem] text-white">
                        View Ad
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Productcard;
