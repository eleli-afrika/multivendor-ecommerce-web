import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <div className="overflow-x-hidden app">
            <BrowserRouter>
                {' '}
                <ScrollToTop />
                <Routes />
            </BrowserRouter>
        </div>
    );
}
export default App;
