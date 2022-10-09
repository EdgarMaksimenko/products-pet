import styles from './ProductList.module.css';
import React from 'react';
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, onSnapshot, querySnapshot, deleteDoc, doc, orderBy  } from 'firebase/firestore';
import { db } from '../../firebase';
import { setProducts } from '../../store/slices/productsSlice';

const ProductList = () => {
  const { productsData, isLoading } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let itemsToDelete = [];

  React.useEffect(() =>{
    try{
      const q = query(collection(db, 'products'), orderBy('sku'));
      onSnapshot(q, (querySnapshot) => {
        dispatch(setProducts((querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })))));
      });
    }catch(err){
      console.log(err);
    }
  },[]);

  const deleteProducts = () => {
    itemsToDelete.forEach(item => {
      try{
        deleteDoc(doc(db, 'products', item));
      } catch (err) {
        console.log(err);
      }
    })
  };

  const toggleToDelete = (dataId) => {
    const productId = itemsToDelete.find(item => item === dataId);
    if(productId){
      itemsToDelete = itemsToDelete.filter(item => item !== dataId);
    }else{
      itemsToDelete.push(dataId);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <p>Product List</p>
        </div>
        <div className={styles.header__btns}>
          <button onClick={() => navigate('/add-product')}>ADD</button>
          <button id='delete-product-btn' onClick={() => deleteProducts()}>MASS DELETE</button>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.products}>
          {!isLoading && productsData.map(({id, data}) => (
            <div className={styles.products__item} key={id}>
              <input type="checkbox" className='Delete Checkbox' onChange={() => toggleToDelete(id)}/>
              <p>{data.sku}</p>
              <p>{data.name}</p>
              <p>{data.price} $</p>
              <p>{data.units}</p>
            </div>
          ))}
          {isLoading && <Loading/>}
        </div>
      </div>
    </>
  )
};

export default ProductList;