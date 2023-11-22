import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, seller, description, id }: productCard) {
    const navigate = useNavigate();

    return (
        <div
            className="rounded-lg overflow-hidden bg-none radius-2xl w-full lg:w-[200px] h-[300px] lg:h-[300px] mb-2 duration-200 cursor-pointer hover:scale-95"
            onClick={() => navigate(`/ad_info/${id}`)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <img className="w-full h-2/3 lg:h-3/5 object-cover" src={image} alt={name} />
            <div className="px-3 py-1">
                <div className="flex flex-row justify-between text-md">
                    <p className="text-green-dark truncate text-[14px] lg:text-md font-bold">
                        {seller}
                    </p>
                </div>
                <h1 className="text-[10px] text-stone-400 lg:text-md font-bold uppercase truncate">
                    {name}
                </h1>
                <p className="text-slate-400 text-[10px] line-clamp-1 lowercase">{description}</p>
                <p className="text-stone-500 text-sm font-bold">Ksh: {price}</p>

                <button className="bg-primary-orange mt-2 w-full rounded-[15px] duration-300 hover:bg-secondary-orange hover:scale-105 text-white text-bold">
                    Inquire
                </button>
            </div>
        </div>
    );
}

export default Productcard;
