import Inquiries from '../../components/Dashboard/Inquiries';
import Sidebar from '../../components/Dashboard/Sidebar';

const InquiriesPAge = () => {
    return (
        <div className="flex parent">
            <Sidebar />
            <div className="flex-1 p-5 mx-auto my-body">
                <Inquiries />
            </div>
        </div>
    );
};

export default InquiriesPAge;
