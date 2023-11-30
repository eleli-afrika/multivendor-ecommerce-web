// import Sidebar from '../../components/Dashboard/Sidebar';
// import ChatSidebar from '../../components/Chat/ChatSidebar';
// import ChartBody from '../../components/Chat/ChartBody';
// import { useState } from 'react';
// import Sidebar from '../../components/Dashboard/Sidebar';

const Messages = () => {
    // const [sidebarActive, setSidebarActive] = useState(true);
    // const [chatBodyActive, setChatBodyActive] = useState(false);
    return (
        <div className="flex parent h-screen  bg-gray-light p-3 ">
            {/* <div className="flex  mx-auto my-body  border h-[100%]">
                <div
                    className={`${
                        sidebarActive
                            ? 'flex-[100%] lg:flex-[30%]'
                            : 'hidden lg:block flex-0 lg:flex-[30%]'
                    } bg-white  price  flex-[0.3]`}
                >
                    <ChatSidebar
                        sidebarActive={sidebarActive}
                        setChatBodyActive={setChatBodyActive}
                        setSidebarActive={setSidebarActive}
                        chatBodyActive={chatBodyActive}
                    />
                </div>
                <div
                    className={`${
                        chatBodyActive
                            ? 'flex-[100%] lg:flex-[70%]'
                            : 'hidden lg:block   lg:flex-[70%] lg:bg-tertiary-orange'
                    } flex-[0.7]`}
                >
                    <ChartBody
                        sidebarActive={sidebarActive}
                        setChatBodyActive={setChatBodyActive}
                        setSidebarActive={setSidebarActive}
                        chatBodyActive={chatBodyActive}
                    />
                </div>
            </div> */}
            <p className="text-black-main text-centers mt-2">Hello, you do not have any messages</p>
        </div>
    );
};

export default Messages;
