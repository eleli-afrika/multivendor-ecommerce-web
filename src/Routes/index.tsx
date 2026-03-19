import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import LandingPage from '../pages/LandingPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import VendorStorePage from '../pages/VendorStorePage';
import SearchPage from '../pages/SearchPage';
import DashboardPage from '../pages/DashboardPage';
import CheckoutPage from '../pages/CheckoutPage';
import OrderTrackingPage from '../pages/OrderTrackingPage';
import ChatPage from '../pages/ChatPage';
import PricingPage from '../pages/PricingPage';
import UserDashboard from '../pages/userDash/Dashboard';
import MyAds from '../pages/userDash/MyAds';
import Pending from '../pages/userDash/Pending';
import Declined from '../pages/userDash/Declined';
import Closed from '../pages/userDash/Closed';
import Drafts from '../pages/userDash/Drafts';
import Pricing from '../pages/Pricing';
import { useEffect, useState } from 'react';
import AdsForm from '../components/Ad/AdForm';
import Footer from '../constants/footer';
import Contact from '../pages/Contact';
import Services from '../pages/services';
import { ToastContainer } from 'react-toastify';
import AdInfo from '../pages/AdInfo';
import Terms from '../pages/Terms';
import Navbar from '../constants/navbar';
import AdsPage from '../pages/AdsPage';
import SellersAds from '../pages/SellersAds';
import FAQSPage from '../pages/FAQSPage';
import Profile from '../pages/userDash/profile';
import Login from '../pages/login';
import Register from '../pages/Register';
// import ScrollToTop from '../components/ScrollToTop';
import Notification from '../pages/userDash/Notifications';
import Messages from '../pages/userDash/Messages';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/store';
import { getLoggedInUser } from '../Redux/slices/AuthSlice';
import Freemium from '../components/Packages/Freemium';
import BasicPackage from '../components/Packages/Basic';
import PremiumPackage from '../components/Packages/Premium';
import StandardPackage from '../components/Packages/standard';
import UserSidebar from '../components/Dashboard/Sidebar';
import PrivateRoute from '../components/PrivateRoute';
import PrivacyPolicy from '../pages/privacy';
import AllTopAds from '../pages/AllTopAds';
import AllSponsoredAds from '../pages/AllSponsoredAds';
import AllAds from '../pages/AllAds';
import InquiriesPAge from '../pages/userDash/Inquiries';
import SellerAd from '../pages/SellerAd';
import PassResetPage from '../pages/userDash/ForgotPassword';
import ConfirmCodePage from '../pages/ConfirmCodePage';
import ResetPasswordPage from '../pages/ResetPasswordPage';

const Index = () => {
    const [, setShowLogin] = useState<boolean>(false);
    const [, setLoggedIn] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const auth = localStorage.getItem('userToken');
        // console.log(auth);

        if (auth == '' || auth == null || auth == undefined) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    }, []);

    const getUser = async () => {
        dispatch(getLoggedInUser());
    };

    useEffect(() => {
        getUser();
    }, []);

    const [showAdsForm, setShowAdsForm] = useState<boolean>(false);
    return (
        <div className=" ">
            <Navbar SetShowLogin={setShowLogin} SetShowAdsForm={setShowAdsForm} />

            <ToastContainer position="top-center" />
            <AdsForm showAdsForm={showAdsForm} setShowAdsForm={setShowAdsForm} />
            <div className=" mt-[170px] md:mt-[10rem] max-w-[100vw] " id="root">
                <div className="md:hidden lg:hidden">
                    <UserSidebar />
                </div>
                {/* <ScrollToTop> */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset_password_request" element={<PassResetPage />} />
                    <Route path="/reset_password" element={<ResetPasswordPage />} />
                    <Route path="/confirm_code" element={<ConfirmCodePage />} />
                    <Route path="/" element={<Landing />} />
                    <Route path="/marketplace" element={<LandingPage />} />
                    <Route path="/products" element={<SearchPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders/:id" element={<OrderTrackingPage />} />
                    <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
                    <Route path="/pricing-new" element={<PricingPage />} />
                    <Route
                        path="/Dashboard"
                        element={
                            <PrivateRoute>
                                {' '}
                                <UserDashboard />{' '}
                            </PrivateRoute>
                        }
                    />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route
                        path="/free"
                        element={
                            <PrivateRoute>
                                <Freemium />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/basic"
                        element={
                            <PrivateRoute>
                                <BasicPackage />{' '}
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/standard"
                        element={
                            <PrivateRoute>
                                <StandardPackage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/premium"
                        element={
                            <PrivateRoute>
                                <PremiumPackage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/search/products" element={<AdsPage />} />
                    <Route path="/terms_and_conditions" element={<Terms />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/eleli/faq" element={<FAQSPage />} />
                    <Route path="/ad_info/:id" element={<AdInfo />} />
                    <Route path="/seller/store/:id" element={<SellersAds />} />
                    <Route path="/shop/:id" element={<VendorStorePage />} />
                    <Route path="/dashboard-new" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                    <Route path="/top_ads" element={<AllTopAds />} />
                    <Route path="/sponsored_ads" element={<AllSponsoredAds />} />
                    <Route path="/all_ads" element={<AllAds />} />

                    <Route
                        path="/product_info/:id"
                        element={
                            <PrivateRoute>
                                <SellerAd />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile/myads"
                        element={
                            <PrivateRoute>
                                <MyAds />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile/pending"
                        element={
                            <PrivateRoute>
                                {' '}
                                <Pending />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile/inquiries"
                        element={
                            <PrivateRoute>
                                {' '}
                                <InquiriesPAge />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile/declined"
                        element={
                            <PrivateRoute>
                                <Declined />{' '}
                            </PrivateRoute>
                        }
                    />
                    {/* <Route path="/new-ad" element={<CreateAds />} /> */}
                    <Route
                        path="/profile/closed"
                        element={
                            <PrivateRoute>
                                {' '}
                                <Closed />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile/drafts"
                        element={
                            <PrivateRoute>
                                <Drafts />{' '}
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/notifications"
                        element={
                            <PrivateRoute>
                                <Notification />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/messages"
                        element={
                            <PrivateRoute>
                                <Messages />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                </Routes>
                {/* </ScrollToTop> */}
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Index;
