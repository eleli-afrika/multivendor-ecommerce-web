import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        
        window.scrollTo(0, 0);
        console.log(pathname);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
