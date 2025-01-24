import { Avatar } from 'antd';

type Props = {
    
    setChatBodyActive: React.Dispatch<React.SetStateAction<boolean>>;
    setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideCharts: React.FC<Props> = ({ setChatBodyActive, setSidebarActive }) => {
    return (
        <div
            className="flex gap-5 items-center p-3 border-b"
            onClick={() => {
                console.log('btn clicked');
                setSidebarActive(false);
                setChatBodyActive(true);
            }}
        >
            <Avatar className="h-12 w-12 rounded-full" />
            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl text-gray-600">Jane Doe</h2>
                <p className="text-gray-600 text-sm">Last Message goes here...</p>
            </div>
        </div>
    );
};

export default SideCharts;
