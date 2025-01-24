import { useEffect } from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import Profile from '../../components/Dashboard/profile';

const profile = () => {
    useEffect(() => {
        document.title = 'Profile';
    }, []);

    return (
        <div className="flex parent">
            <Sidebar />
            <div className="flex-1 p-5 mx-auto my-body">
                <Profile />
            </div>
        </div>
    );
};

export default profile;
