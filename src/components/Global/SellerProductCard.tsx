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
                    <h1 className="text-slate-700 font-bold uppercase truncate">{name}</h1>
                    
                </div>
                <p className="text-stone-500 font-bold">Ksh: {price}</p>
                <div className="flex flex-row items-center justify-start">
                    <p className="text-slate-400 text-xs"> rated 4.5 </p>
                    <p className="text-xs text-slate-400 my-2">(of 200 reviews)</p>
                </div>
                
            </div>
        </div>
    );
}

export default Productcard;
