import { Avatar } from 'antd';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import SideCharts from './SideCharts';

type Props = {
    
    chatBodyActive: boolean;
    sidebarActive: boolean;
    setChatBodyActive: React.Dispatch<React.SetStateAction<boolean>>;
    setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatSidebar: React.FC<Props> = ({
   
    setChatBodyActive,
   
    setSidebarActive,
}) => {
    const user = useSelector((state: any) => state.auth.user);
    return (
        <div className="flex flex-col overflow-y-auto h-full">
            <div className="flex justify-between items-center p-2 h-[5rem] w-full price bg-gray-300">
                <Avatar src={`data:image/jpeg;base64,${user?.userimage}`} className="h-12 w-12" />
                <h1 className="text-gray-500 font-bold">My Messages </h1>
                <FaBars className="text-gray-500 font-bold" />
            </div>
            <div className="h-16 w-full bg-gray-200 px-4 py-2 ">
                <form action="">
                    <input
                        type="text"
                        className="border rounded-[25px] px-5"
                        placeholder="Search or start a new chat"
                    />
                </form>
            </div>
            <div>
                <SideCharts
                    setChatBodyActive={setChatBodyActive}
                    setSidebarActive={setSidebarActive}
                />
                <SideCharts
                    setChatBodyActive={setChatBodyActive}
                    setSidebarActive={setSidebarActive}
                />
                <SideCharts
                    setChatBodyActive={setChatBodyActive}
                    setSidebarActive={setSidebarActive}
                />
                <SideCharts
                    setChatBodyActive={setChatBodyActive}
                    setSidebarActive={setSidebarActive}
                />
                <SideCharts
                    setChatBodyActive={setChatBodyActive}
                    setSidebarActive={setSidebarActive}
                />
                <SideCharts
                    setChatBodyActive={setChatBodyActive}
                    setSidebarActive={setSidebarActive}
                />
                <SideCharts
                    setChatBodyActive={setChatBodyActive}
                    setSidebarActive={setSidebarActive}
                />
                <SideCharts
                    setChatBodyActive={setChatBodyActive}
                    setSidebarActive={setSidebarActive}
                />
            </div>
        </div>
    );
};

export default ChatSidebar;
