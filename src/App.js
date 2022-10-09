import {Routes, Route, Navigate} from 'react-router-dom';
import AddProduct from './components/AddProduct/AddProduct';
import NotFound from './components/NotFound/NotFound';
import PopUp from './components/PopUp/PopUp';
import ProductList from './components/ProductList/ProductList';

const App = () => {
  return (
    <div className="body-wrapper">
      <PopUp/>
      <div className="container">
        <Routes>
          <Route path ="/" exact={true} element={<ProductList/>}/>
          <Route path ="/add-product" exact={true} element={<AddProduct/>}/>
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path ="/404" element={<NotFound/>}/>
        </Routes>
      </div>  
    </div> 
  );
}

export default App;
