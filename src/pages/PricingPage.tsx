import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { packagesAPI, vendorAPI } from '../api/api';
import { toast } from 'react-toastify';
import { RootState } from '../Redux/store';
import { useNavigate } from 'react-router-dom';

interface Package {
    id: string;
    name: string;
    base_monthly_price: number;
    product_limit: number;
    can_appear_in_related: boolean;
    can_appear_on_landing: boolean;
    can_appear_in_sidebar: boolean;
    can_appear_as_promoted: boolean;
}

const PricingPage: React.FC = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [subscribing, setSubscribing] = useState<string | null>(null);
    const [billingCycle, setBillingCycle] = useState('monthly');

    const authState = useSelector((state: RootState) => state.auth as unknown as Record<string, unknown>);
    const userToken = authState.userToken as string | null;

    const isVendor = userToken ? (() => {
        try { return JSON.parse(atob(userToken.split('.')[1])).is_vendor; }
        catch { return false; }
    })() : false;

    useEffect(() => {
        packagesAPI.getAll().then(res => {
            setPackages(res.data.data || []);
            setLoading(false);
        });
    }, []);

    const discounts: Record<string, number> = {
        monthly: 0, quarterly: 10, semi_annual: 20, annual: 30,
    };
    const months: Record<string, number> = {
        monthly: 1, quarterly: 3, semi_annual: 6, annual: 12,
    };

    const getFinalPrice = (pkg: Package) => {
        const disc = discounts[billingCycle] || 0;
        return pkg.base_monthly_price * months[billingCycle] * (1 - disc / 100);
    };

    const handleSubscribe = async (packageId: string) => {
        if (!userToken) {
            toast.error('Please login to subscribe');
            navigate('/login');
            return;
        }
        if (!isVendor) {
            toast.error('You need to be an approved vendor to subscribe');
            navigate('/Dashboard');
            return;
        }

        setSubscribing(packageId);
        try {
            await vendorAPI.subscribe({ package_id: packageId, billing_cycle: billingCycle });
            toast.success('Subscription activated!');
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            toast.error(error?.response?.data?.message || 'Subscription failed');
        } finally {
            setSubscribing(null);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    const packageColors: Record<string, string> = {
        'Basic': 'border-gray-200',
        'Standard': 'border-blue-200',
        'Premium': 'border-purple-200',
        'Premium Plus': 'border-yellow-400',
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-2">Choose Your Plan</h1>
            <p className="text-gray-500 text-center mb-8">Grow your business with the right subscription</p>

            {/* Billing Cycle Selector */}
            <div className="flex justify-center mb-8">
                <div className="flex bg-gray-100 rounded-lg p-1">
                    {Object.entries(discounts).map(([cycle, disc]) => (
                        <button
                            key={cycle}
                            onClick={() => setBillingCycle(cycle)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                                billingCycle === cycle ? 'bg-white shadow text-blue-600' : 'text-gray-600'
                            }`}
                        >
                            {cycle.replace('_', ' ')}
                            {disc > 0 && <span className="ml-1 text-xs text-green-600">-{disc}%</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages.map((pkg) => {
                    const finalPrice = getFinalPrice(pkg);
                    const isPopular = pkg.name === 'Premium';
                    return (
                        <div
                            key={pkg.id}
                            className={`bg-white rounded-xl border-2 ${packageColors[pkg.name] || 'border-gray-200'} p-6 flex flex-col ${isPopular ? 'ring-2 ring-purple-500' : ''}`}
                        >
                            {isPopular && (
                                <span className="text-xs font-bold bg-purple-500 text-white px-3 py-1 rounded-full self-start mb-3">POPULAR</span>
                            )}
                            <h2 className="text-xl font-bold mb-1">{pkg.name}</h2>
                            <div className="mb-4">
                                <span className="text-3xl font-bold">KES {finalPrice.toFixed(0)}</span>
                                <span className="text-gray-500 text-sm">/{billingCycle.replace('_', ' ')}</span>
                                {billingCycle !== 'monthly' && (
                                    <p className="text-xs text-gray-400">≈ KES {(finalPrice / months[billingCycle]).toFixed(0)}/mo</p>
                                )}
                            </div>

                            <ul className="space-y-2 mb-6 flex-1">
                                <li className="text-sm flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    {pkg.product_limit === -1 ? 'Unlimited products' : `${pkg.product_limit} products`}
                                </li>
                                <li className={`text-sm flex items-center gap-2 ${pkg.can_appear_in_related ? '' : 'text-gray-400'}`}>
                                    <span className={pkg.can_appear_in_related ? 'text-green-500' : 'text-gray-300'}>
                                        {pkg.can_appear_in_related ? '✓' : '✗'}
                                    </span>
                                    Appear in related
                                </li>
                                <li className={`text-sm flex items-center gap-2 ${pkg.can_appear_on_landing ? '' : 'text-gray-400'}`}>
                                    <span className={pkg.can_appear_on_landing ? 'text-green-500' : 'text-gray-300'}>
                                        {pkg.can_appear_on_landing ? '✓' : '✗'}
                                    </span>
                                    Landing page visibility
                                </li>
                                <li className={`text-sm flex items-center gap-2 ${pkg.can_appear_in_sidebar ? '' : 'text-gray-400'}`}>
                                    <span className={pkg.can_appear_in_sidebar ? 'text-green-500' : 'text-gray-300'}>
                                        {pkg.can_appear_in_sidebar ? '✓' : '✗'}
                                    </span>
                                    Sidebar placement
                                </li>
                                <li className={`text-sm flex items-center gap-2 ${pkg.can_appear_as_promoted ? '' : 'text-gray-400'}`}>
                                    <span className={pkg.can_appear_as_promoted ? 'text-green-500' : 'text-gray-300'}>
                                        {pkg.can_appear_as_promoted ? '✓' : '✗'}
                                    </span>
                                    Promoted listing
                                </li>
                            </ul>

                            <button
                                onClick={() => handleSubscribe(pkg.id)}
                                disabled={subscribing === pkg.id}
                                className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${
                                    pkg.name === 'Premium Plus'
                                        ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                                        : pkg.name === 'Premium'
                                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                } disabled:opacity-50`}
                            >
                                {subscribing === pkg.id ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PricingPage;
