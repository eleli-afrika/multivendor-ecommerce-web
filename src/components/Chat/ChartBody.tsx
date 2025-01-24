import { Avatar } from 'antd';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Close } from '@mui/icons-material';
import Chart from './Chart';
import { BiMicrophone } from 'react-icons/bi';


type Props = {
    
    chatBodyActive: boolean;
    sidebarActive: boolean;
    setChatBodyActive: React.Dispatch<React.SetStateAction<boolean>>;
    setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChartBody: React.FC<Props> = ({ setChatBodyActive, setSidebarActive }) => {
    return (
        <div className="flex flex-col bg-gray-200 w-full  price ">
            <div className="flex justify-between items-center h-[10vh] p-2">
                <Avatar className="h-12 w-12" />
                <div className="flex">
                    <h1 className="text-gray-500 font-bold text-xl">Jane Doe</h1>
                </div>
                <div className="flex px-3 text-gray-500">
                    <SearchOutlined />
                    <AttachFile />
                    <MoreVert />
                    <Close
                        className="bg-gray-700 rounded-full p-1 text-white font-bold hidden close"
                        onClick={() => {
                            console.log('btn clicked');
                            setSidebarActive(true);
                            setChatBodyActive(false);
                        }}
                    />
                </div>
            </div>
            <div>
                <Chart />
            </div>
            <div className="h-[10vh]  p-5">
                <form action="" className="flex justify-between items-center ">
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
