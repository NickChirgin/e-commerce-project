import { ROUTES } from '@config/routes';
import Main from '@pages/Main';
import Product from '@pages/Product';
import './App.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Main />} />
        <Route path={ROUTES.PRODUCT}>
          <Route path=":id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
