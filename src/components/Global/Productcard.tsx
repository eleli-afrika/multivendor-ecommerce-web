import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, id }: productCard) {
    const navigate = useNavigate();

    return (
        <div
            className="rounded-lg bg-none radius-2xl w-[47vw] lg:w-[220px] px-[6px] lg:px-[5px] h-[250px] lg:h-[280px] mb-2 duration-200 cursor-pointer hover:scale-95 "
            onClick={() => navigate(`/ad_info/${id}`)}
        >
            <img
                className="w-full h-2/3 lg:h-3/5 object-cover"
                src={image}
                alt={name}
                style={{
                    borderTopRightRadius: '0.75rem',
                    borderTopLeftRadius: '0.75rem',
                }}
            />
            <div className="py-1 lg:h-2/5 flex flex-col ">
                <h1 className="text-[15px] text-black-main lg:text-md capitalize flex line-clamp-2 h-[40px] ">
                    {name}
                </h1>
                <p className="text-black-main text-[18px] font-bold ">Ksh: {price}</p>
            </div>
        </div>
    );
}

export default Productcard;
