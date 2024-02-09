import { Table } from 'antd';
import { Edit, Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FetchLoggedUsersProducts } from '../../Redux/slices/AdsSlice';
import { GettingUserById } from '../../Redux/slices/AuthSlice';
import { AppDispatch } from '../../Redux/store';
import Loader from '../../constants/loader';
import { Action } from 'redux';
import { toast } from 'react-toastify';
import {
    DeleteProduct,
    DeactivateProduct,
    ActivateProduct,
    RestoreProduct,
} from '../../Redux/hooks/Ads.actions';
import { setLoader } from '../../Redux/slices/LoaderSlice';
import { useNavigate } from 'react-router-dom';
import AdForm from '../Ad/AdEditForm';

const AdsTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, Ads } = useSelector((state: any) => state.AllAds);
    const user = useSelector((state: any) => state.auth.user);
    const id = user?.userid;
    const [isEditing, setIsEditing] = useState(false);
    const [AdID, setAdID] = useState('');

    const getupadated = () => {
        dispatch(GettingUserById(id)).then((action: Action<unknown>) => {
            if (GettingUserById.fulfilled.match(action)) {
                console.log(user);
                dispatch(FetchLoggedUsersProducts(id));
            }
        });
    };

    // useEffect(() => {
    //     dispatch(GettingUserById(id)).then((action: Action<unknown>) => {
    //         if (GettingUserById.fulfilled.match(action)) {
    //             console.log(user);
    //             dispatch(FetchLoggedUsersProducts(id));
    //         }
    //     });
    // }, [dispatch, id]);

    const deleteProduct = async (id: any) => {
        try {
            dispatch(setLoader(true));
            const response = await DeleteProduct(id);
            console.log(response);
            toast.success('product deletedsuccessfully...');
            dispatch(setLoader(false));
        } catch (error) {
            toast.error('failed to delete, try again later');
        }
        dispatch(setLoader(false));
        navigate('/profile/myads');
        getupadated();
    };
    const deactivateProduct = async (id: any) => {
        try {
            dispatch(setLoader(true));
            const response = await DeactivateProduct(id);
            console.log(response);
            toast.success('product deactivated successfully...');
            dispatch(setLoader(false));
            // dispatch(FetchLoggedUsersProducts(id));
        } catch (error: any) {
            toast.error('failed to deactivate, try again later');
            console.log(error);
            dispatch(setLoader(false));
            navigate('/profile/myads');
        }
        getupadated();
    };
    const activateProduct = async (id: any) => {
        try {
            dispatch(setLoader(true));
            const response = await ActivateProduct(id);
            console.log(response);
            toast.success('product activated successfully...');
            dispatch(setLoader(false));
            // dispatch(FetchLoggedUsersProducts(id));
        } catch (error) {
            toast.error('failed to activate, try again later');
        }

        dispatch(setLoader(false));
        navigate('/profile/myads');
        getupadated();
    };
    const restoreProduct = async (id: any) => {
        try {
            dispatch(setLoader(true));
            const response = await RestoreProduct(id);
            console.log(response);
            toast.success('product Restored successfully...');
            dispatch(setLoader(false));
            // dispatch(FetchLoggedUsersProducts(id));
        } catch (error) {
            toast.error('failed to restore, try again later');
        }

        dispatch(setLoader(false));
        navigate('/profile/myads');
        getupadated();
    };

    const toggleProductStatus = async (_productId: any, _isActive: any) => {
        try {
            // // Update product status here
            // dispatch(FetchLoggedUsersProducts(id));
        } catch (error) {
            console.log(error);
        }

        dispatch(setLoader(false));
        navigate('/profile/myads');
    };

    const TableData = [
        {
            title: 'Name',
            dataIndex: 'productname',
        },
        {
            title: 'Status',
            dataIndex: 'isactive',
            render: (isActive: Boolean, record: any) => (
                <span>
                    <span className="flex gap-2">
                        <span style={{ color: isActive ? 'green' : 'red' }}>&bull;</span>
                        <span style={{ color: isActive ? 'green' : 'red' }}>
                            {isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span
                            onClick={() => toggleProductStatus(record.productid, isActive)}
                            className="underline"
                        >
                            {isActive ? (
                                <span onClick={() => deactivateProduct(record.producttid)}>
                                    Deactivate
                                </span>
                            ) : (
                                <span onClick={() => activateProduct(record.producttid)}>
                                    Activate
                                </span>
                            )}
                        </span>
                    </span>
                </span>
            ),
        },
        // {
        //   title: "Brand",
        //   dataIndex: "brand",
        // },
        // {
        //   title: "Category",
        //   dataIndex: "category",
        // },
        {
            title: 'DateAdded',
            dataIndex: 'dateadded',
        },
        {
            title: 'IsApproved',
            dataIndex: 'isapproved',

            render: (isApproved: Boolean) => (
                <span className="flex gap-2">
                    <span style={{ color: isApproved ? 'green' : 'red' }}>
                        {isApproved ? 'Approved' : 'Pending'}
                    </span>
                </span>
            ),
            // filters: [
            //   { text: "Approved", value: "true" },
            //   { text: "Pending", value: "false" },
            // ],
            // onFilter: (value: any, record: any) => {
            //   console.log(value);
            //   return record.isapproved === value;
            // },
        },

        {
            title: 'IsDeleted',
            dataIndex: 'isdeleted',
            render: (isDeleted: Boolean, record: any) => (
                <span className="flex gap-2">
                    {isDeleted ? 'Deleted' : 'No'}
                    <span
                        onClick={() => toggleProductStatus(record.productid, isDeleted)}
                        className="underline cursor-pointer"
                    >
                        {isDeleted ? (
                            <span onClick={() => restoreProduct(record.producttid)}>Restore</span>
                        ) : (
                            <span onClick={() => deleteProduct(record.producttid)}>Delete</span>
                        )}
                    </span>
                </span>
            ),
        },
        {
            title: 'IsSuspended',
            dataIndex: 'issuspended',
            render: (isSuspended: Boolean, _record: any) => (
                <span className="flex gap-2">
                    {isSuspended ? 'Suspended' : 'No'}
                    {/* <span
            onClick={() => toggleProductStatus(record.productid, isSuspended)}
            className="underline"
          >
            {isSuspended ? "Unsuspend" : "Suspend"}
          </span> */}
                </span>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            render: (text: any, record: any) => (
                <div className="flex mr-2 gap-3">
                    <Visibility
                        className="text-primary-orange"
                        onClick={() => {
                            navigate(`/product_info/${record.producttid}`), console.log(text);
                        }}
                    />
                    <Edit
                        className="text-green-500"
                        onClick={() => {
                            setAdID(record.producttid);
                            setIsEditing(true);
                            // console.log('this is record id', record.producttid);
                            // console.log('this is ad id', AdID);
                        }}
                    />
                </div>
            ),
        },
    ];
    if (isLoading) return <Loader />;

    return (
        <div className="mt-4">
            <div className="text-gray-500 flex flex-col gap-3 px-[10px] lg:px-0">
                <h2 className="underline font-bold">GuideLines</h2>
                <p> * You cannot delete An Active Ad</p>
                <p> * To delete an Ad, Deactivate it first</p>
                <p> * Only the Admin can Approve and Suspend Your Ads</p>
            </div>

            <div className=" mt-4 table-responsive px-[10px] lg:px-0">
                <Table columns={TableData} dataSource={Ads} className="border rounded-sm" />
            </div>
            {isEditing && <AdForm isEditing={isEditing} id={AdID} setIsEditing={setIsEditing} />}
        </div>
    );
};

export default AdsTable;
