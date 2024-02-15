import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <BrowserRouter>
            {' '}
            <ScrollToTop />
            <Routes />
        </BrowserRouter>
    );
}
export default App;
