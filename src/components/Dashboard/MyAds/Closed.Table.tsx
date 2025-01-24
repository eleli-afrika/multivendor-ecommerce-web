import { Table } from 'antd';
import { Visibility } from '@mui/icons-material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchLoggedUsersProducts } from '../../../Redux/slices/AdsSlice';
import { AppDispatch } from '../../../Redux/store';
import { ProductData } from '../../../interface/common';
import Loader from '../../../constants/loader';
import { useNavigate } from 'react-router-dom';

const AdsTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, Ads } = useSelector((state: any) => state.AllAds);
    const user = useSelector((state: any) => state.auth.user);
    const id = user?.userid;
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(FetchLoggedUsersProducts(id));
    }, [dispatch, id]);

    const filteredAds = Ads.filter((product: ProductData) => !product.isactive);

    const TableData = [
        {
            title: 'Name',
            dataIndex: 'productname',
        },

        {
            title: 'Price',
            dataIndex: 'productprice',
        },

        {
            title: 'CreatedAt',
            dataIndex: 'dateadded',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            render: (text: any, record: any) => {
                console.log(record, text);
                return (
                    <div className="flex mr-2 gap-3">
                        <Visibility
                            className="text-primary-orange"
                            onClick={() => {
                                navigate(`/product_info/${record.producttid}`), console.log(text);
                            }}
                        />
                        
                    </div>
                );
            },
        },
    ];

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="mt-4">
            <Table
                columns={TableData}
                dataSource={filteredAds}
                className="border rounded-sm"
            ></Table>
        </div>
    );
};

export default AdsTable;
