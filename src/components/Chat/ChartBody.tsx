import { Avatar } from 'antd';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from '@mui/icons-material';
import Chart from './Chart';
import { BiMicrophone } from 'react-icons/bi';
import Picker from 'emoji-picker-react';

const ChartBody = () => {
    return (
        <div className="flex flex-col bg-gray-200 w-full  ">
            <div className="flex justify-between items-center h-[5rem] p-2">
                <Avatar className="h-12 w-12" />
                <div className="flex">
                    <h1 className="text-gray-500 font-bold text-xl">Jane Doe</h1>
                </div>
                <div className="flex px-3 text-gray-500">
                    <SearchOutlined />
                    <AttachFile />
                    <MoreVert />
                </div>
            </div>
            <div>
                <Chart />
            </div>
            <div>
                <form action="" className="flex justify-between items-center p-[1.17rem]">
                    <InsertEmoticon className="font-bold text-gray-600" />
                    <input
                        type="'text'"
                        className="border rounded-[25px] px-5"
                        placeholder="Type your message"
                    />
                    <BiMicrophone className="font-bold text-gray-600" />
                </form>
            </div>
        </div>
    );
};

export default ChartBody;
