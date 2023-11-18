import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import UserDashboard from '../pages/userDash/Dashboard';
import MyAds from '../pages/userDash/MyAds';
import Pending from '../pages/userDash/Pending';
import Declined from '../pages/userDash/Declined';
import Closed from '../pages/userDash/Closed';
import Drafts from '../pages/userDash/Drafts';
import Pricing from '../pages/Pricing';
// import CreateAds from '../pages/CreateAds';
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
import ScrollToTop from '../components/ScrollToTop';
// import ProtectedRoutes from "./ProtectedRoutes";
import Notification from '../pages/userDash/Notifications';
import Messages from '../pages/userDash/Messages';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/store';
import { getLoggedInUser } from '../Redux/slices/AuthSlice';
import Freemium from '../components/Packages/Freemium';
import BasicPackage from '../components/Packages/Basic';
import PremiumPackage from '../components/Packages/Premium';
import StandardPackage from '../components/Packages/standard';

const Index = () => {
    const [, setShowLogin] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState(false);
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

    // useEffect(() => {
    //     dispatch(GettingSellers());
    // }, []);

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            getUser();
        }
    }, []);

    const [showAdsForm, setShowAdsForm] = useState<boolean>(false);
    return (
        <div className=" ">
            <Navbar SetShowLogin={setShowLogin} SetShowAdsForm={setShowAdsForm} />

            <ToastContainer position="top-center" />
            <AdsForm showAdsForm={showAdsForm} setShowAdsForm={setShowAdsForm} />
            <div className=" mt-20 md:mt-[11rem] max-w-[100vw]" id="root">
                <ScrollToTop>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Landing />} />
                        <Route
                            path="/Dashboard"
                            element={loggedIn ? <UserDashboard /> : <Login />}
                        />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/free" element={<Freemium />} />
                        <Route path="/basic" element={<BasicPackage />} />
                        <Route path="/standard" element={<StandardPackage />} />
                        <Route path="/premium" element={<PremiumPackage />} />
                        <Route path="/search/products" element={<AdsPage />} />
                        <Route path="/terms_and_conditions" element={<Terms />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/eduka/faq" element={<FAQSPage />} />
                        <Route path="/ad_info/:id" element={<AdInfo />} />
                        <Route path="/seller/store/" element={<SellersAds />} />
                        <Route path="/profile" element={loggedIn ? <Profile /> : <Login />} />
                        <Route path="/profile/myads" element={loggedIn ? <MyAds /> : <Login />} />
                        <Route
                            path="/profile/pending"
                            element={loggedIn ? <Pending /> : <Login />}
                        />
                        <Route
                            path="/profile/declined"
                            element={loggedIn ? <Declined /> : <Login />}
                        />
                        {/* <Route path="/new-ad" element={<CreateAds />} /> */}
                        <Route path="/profile/closed" element={loggedIn ? <Closed /> : <Login />} />
                        <Route path="/profile/drafts" element={loggedIn ? <Drafts /> : <Login />} />
                        <Route
                            path="/notifications"
                            element={loggedIn ? <Notification /> : <Login />}
                        />
                        <Route path="/messages" element={loggedIn ? <Messages /> : <Login />} />
                    </Routes>
                </ScrollToTop>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Index;
