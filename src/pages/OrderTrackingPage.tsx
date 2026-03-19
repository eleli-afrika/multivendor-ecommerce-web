import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleOrder } from '../Redux/slices/ordersSlice';
import { ordersAPI } from '../api/api';
import { AppDispatch, RootState } from '../Redux/store';
import { toast } from 'react-toastify';

const OrderTrackingPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { currentOrder } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        if (id) dispatch(fetchSingleOrder(id));
    }, [id, dispatch]);

    if (!currentOrder) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    const order = currentOrder as Record<string, unknown>;
    const statuses = ['order_made', 'order_received', 'delivery_in_progress', 'delivery_made'];
    const currentIndex = statuses.indexOf(order.order_status as string);

    const handleConfirmDelivery = async () => {
        try {
            await ordersAPI.updateStatus(id!, 'delivery_made');
            dispatch(fetchSingleOrder(id!));
            toast.success('Delivery confirmed!');
        } catch {
            toast.error('Failed to confirm delivery');
        }
    };

    const handleCancel = async () => {
        try {
            await ordersAPI.cancel(id!);
            dispatch(fetchSingleOrder(id!));
            toast.success('Order cancelled');
        } catch {
            toast.error('Cannot cancel order at this stage');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Order Tracking</h1>
            <p className="text-gray-500 text-sm mb-6">Order ID: {id}</p>

            {/* Status Timeline */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="font-semibold mb-6">Order Status</h2>
                <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    {statuses.map((status, index) => {
                        const isCompleted = index <= currentIndex && order.order_status !== 'cancelled';
                        const isCurrent = index === currentIndex;
                        return (
                            <div key={status} className="relative flex items-center mb-6 last:mb-0">
                                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    isCompleted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                                }`}>
                                    {isCompleted ? '✓' : index + 1}
                                </div>
                                <div className="ml-4">
                                    <p className={`font-medium ${isCurrent ? 'text-blue-600' : ''}`}>
                                        {status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                    </p>
                                    {isCurrent && <p className="text-xs text-gray-500">Current status</p>}
                                </div>
                            </div>
                        );
                    })}

                    {order.order_status === 'cancelled' && (
                        <div className="relative flex items-center mb-6">
                            <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center bg-red-500 text-white text-sm">✗</div>
                            <div className="ml-4">
                                <p className="font-medium text-red-600">Cancelled</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="font-semibold mb-4">Order Details</h2>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Total Amount</span>
                        <span className="font-bold">KES {(order.total_amount as number).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Payment Status</span>
                        <span className={`capitalize ${order.payment_status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {order.payment_status as string}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="capitalize">{(order.payment_method as string) || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Order Date</span>
                        <span>{new Date(order.created_at as string).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                {order.order_status === 'delivery_in_progress' && (
                    <button
                        onClick={handleConfirmDelivery}
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
                    >
                        Confirm Delivery Received
                    </button>
                )}
                {['order_made', 'order_received'].includes(order.order_status as string) && (
                    <button
                        onClick={handleCancel}
                        className="flex-1 border border-red-500 text-red-500 py-3 rounded-lg font-medium hover:bg-red-50"
                    >
                        Cancel Order
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderTrackingPage;
