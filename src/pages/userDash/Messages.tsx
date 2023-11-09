import Sidebar from '../../components/Dashboard/Sidebar';

const Messages = () => {
    return (
        <div className="flex parent h-screen">
            <Sidebar />
            <div className="flex-1 p-5 mx-auto my-body">
                <p className="text-center text-500">
                    You do not have any messages yet, check back later
                </p>
            </div>
        </div>
    );
};

export default Messages;
