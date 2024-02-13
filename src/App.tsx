import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Navigation from './components/Navigation/Navigation';
import Checkout from './pages/checkout/Checkout';
import { Provider } from 'react-redux';
import configureStore from './store/CreateStore';
import Receipt from './pages/recepit/Receipt';
import NotFound from './pages/notFound/NotFound';
import ProductDetail from './pages/productDetail/ProductDetail';
import Favorites from './pages/favorites/Favorites';
import 'react-toastify/dist/ReactToastify.css';

export const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/:id" element={<Receipt />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
