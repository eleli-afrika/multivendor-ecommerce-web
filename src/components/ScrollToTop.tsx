import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        const navbarHeight = 300;
        window.scrollTo(0, 0 - navbarHeight);
        console.log(pathname);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
