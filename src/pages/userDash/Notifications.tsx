import Sidebar from '../../components/Dashboard/Sidebar';

const Notification = () => {
    return (
        <div className="flex parent h-screen">
            <Sidebar />
            <div className="flex-1 p-5 mx-auto my-body">
                <p className="text-center text-500">
                    You do not have any Notifications, check back later
                </p>
            </div>
        </div>
    );
};

export default Notification;
