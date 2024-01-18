import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PageTitleProps {
    cardName: string;
    linkTitle: string;
    link: string;
}

const CardHeader: React.FC<PageTitleProps> = ({ cardName, linkTitle, link }) => {
    const navigate = useNavigate();
    return (
        <div className="px-[6px] md:px-0">
            <div className="py-3 px-[20px]  flex flex-row items-center justify-between bg-green-dark my-3 rounded-t-[8px] ">
                <h1 className="text-white my-2 font-bold">{cardName}</h1>
                <button
                    className="underline rounded-lg px-2 text-sm py-1 text-white my-2 font-bold"
                    onClick={() => navigate(link)}
                >
                    {linkTitle}
                </button>
            </div>
        </div>
    );
};

export default CardHeader;
