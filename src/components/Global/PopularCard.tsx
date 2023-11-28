import { useNavigate } from 'react-router-dom';
import { productCard } from '../../interface/common';

function Productcard({ image, name, price, id }: productCard) {
    const navigate = useNavigate();

    return (
        <div className="w-[47vw] md:w-[250px] rounded-xl p-0  h-[250px] lg:h-[280px] mb-2 cursor-pointer px-2">
            <div
                className="flex h-full flex-col max-w-sm rounded-xl bg-none md:bg-stone-50 radius-2xl border-gray-300 mb-2 relative hover:scale-105 duration-300"
                onClick={() => navigate(`/ad_info/${id}`)}
            >
                <img
                    className="w-full h-[55%] lg:h-3/5 lg:w-full object-cover object-center lg:object-cover border-none md:border border-red-500"
                    src={image}
                    style={{
                        borderTopRightRadius: '0.75rem',
                        borderTopLeftRadius: '0.75rem',
                    }}
                />
                <div className="py-2 lg:px-2  flex flex-col justify-between">
                    <div className="">
                        <h1 className="text-[15px] text-black-main lg:text-md capitalize h-[40px] line-clamp-2 leading-tight overflow-y-hidden">
                            {name}
                        </h1>
                    </div>
                    <p className="text-[18px] font-bold text-black-main mt-2">Ksh: {price}</p>
                </div>
            </div>
        </div>
    );
}

export default Productcard;
