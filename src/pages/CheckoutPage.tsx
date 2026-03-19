import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { productsAPI, ordersAPI, paymentsAPI } from '../api/api';
import { toast } from 'react-toastify';
import { RootState } from '../Redux/store';

type PaymentMethod = 'mpesa' | 'paystack';

const CheckoutPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const productId = searchParams.get('product_id');
    const vendorId = searchParams.get('vendor_id');

    const authState = useSelector((state: RootState) => state.auth as unknown as Record<string, unknown>);
    const userToken = authState.userToken as string | null;

    const [product, setProduct] = useState<Record<string, unknown> | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
    const [mpesaPhone, setMpesaPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [waitingForMpesa, setWaitingForMpesa] = useState(false);

    useEffect(() => {
        if (productId) {
            productsAPI.getSingle(productId).then(res => {
                const data = res.data.data;
                setProduct(data?.product || data);
            });
        }
    }, [productId]);

    if (!userToken) {
        return (
            <div className="max-w-lg mx-auto px-4 py-20 text-center">
                <p className="text-gray-600 mb-4">Please login to continue checkout</p>
                <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Login</button>
            </div>
        );
    }

    if (!product) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    const price = (product.price as number) * (1 - ((product.discount as number) || 0) / 100);
    const total = price * quantity;

    const getUserEmail = () => {
        try {
            const payload = JSON.parse(atob(userToken!.split('.')[1]));
            return payload.email || '';
        } catch { return ''; }
    };

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Create order first
            const orderRes = await ordersAPI.create({
                vendor_id: vendorId!,
                items: [{ product_id: productId!, quantity }],
            });
            const orderId = orderRes.data.data?.id;

            if (paymentMethod === 'mpesa') {
                if (!mpesaPhone) {
                    toast.error('Please enter your M-Pesa phone number');
                    setLoading(false);
                    return;
                }
                await paymentsAPI.initiateMpesa({ order_id: orderId, phone_number: mpesaPhone });
                setWaitingForMpesa(true);
                toast.success('Check your phone for M-Pesa payment prompt');
            } else {
                const email = getUserEmail();
                const psRes = await paymentsAPI.initiatePaystack({ order_id: orderId, email, amount: total });
                const authUrl = psRes.data.data?.authorization_url;
                if (authUrl) {
                    window.location.href = authUrl;
                }
            }
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(error?.response?.data?.message || 'Checkout failed');
        } finally {
            setLoading(false);
        }
    };

    if (waitingForMpesa) {
        return (
            <div className="max-w-lg mx-auto px-4 py-20 text-center">
                <div className="bg-green-50 rounded-xl p-8">
                    <div className="text-4xl mb-4">📱</div>
                    <h2 className="text-xl font-bold mb-2">Waiting for Payment</h2>
                    <p className="text-gray-600">Please complete the M-Pesa payment on your phone ({mpesaPhone})</p>
                    <p className="text-sm text-gray-400 mt-4">The page will update once payment is confirmed</p>
                    <button onClick={() => navigate('/Dashboard')} className="mt-6 text-blue-600 hover:underline text-sm">
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                <div className="flex gap-4 items-center">
                    {(product.main_image_url as string) && (
                        <img src={product.main_image_url as string} alt={product.name as string} className="w-20 h-20 object-cover rounded" />
                    )}
                    <div className="flex-1">
                        <p className="font-medium">{product.name as string}</p>
                        <p className="text-gray-500 text-sm">KES {price.toFixed(0)} each</p>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                    <label className="text-sm font-medium">Quantity:</label>
                    <div className="flex items-center border rounded">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1">-</button>
                        <span className="px-3 py-1">{quantity}</span>
                        <button onClick={() => setQuantity(Math.min(product.quantity as number, quantity + 1))} className="px-3 py-1">+</button>
                    </div>
                </div>
                <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>KES {total.toFixed(0)}</span>
                    </div>
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${paymentMethod === 'mpesa' ? 'border-blue-500 bg-blue-50' : ''}`}>
                        <input
                            type="radio"
                            value="mpesa"
                            checked={paymentMethod === 'mpesa'}
                            onChange={() => setPaymentMethod('mpesa')}
                        />
                        <span className="font-medium">M-Pesa</span>
                    </label>

                    {paymentMethod === 'mpesa' && (
                        <div className="ml-6">
                            <label className="block text-sm font-medium mb-1">M-Pesa Phone Number</label>
                            <input
                                type="tel"
                                value={mpesaPhone}
                                onChange={(e) => setMpesaPhone(e.target.value)}
                                placeholder="e.g. 0712345678"
                                className="border rounded px-3 py-2 text-sm w-full max-w-xs"
                            />
                        </div>
                    )}

                    <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${paymentMethod === 'paystack' ? 'border-blue-500 bg-blue-50' : ''}`}>
                        <input
                            type="radio"
                            value="paystack"
                            checked={paymentMethod === 'paystack'}
                            onChange={() => setPaymentMethod('paystack')}
                        />
                        <span className="font-medium">Card / Bank (Paystack)</span>
                    </label>
                </div>
            </div>

            <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Processing...' : `Pay KES ${total.toFixed(0)}`}
            </button>
        </div>
    );
};

export default CheckoutPage;
