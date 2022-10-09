import styles from './AddProduct.module.css';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage } from '../../store/slices/popUpSlice';

const AddProduct = () => {
  const navigate = useNavigate();
  const [type, setType] = React.useState('dvd');
  const { productsData } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    resetField,
    setValue,
  } = useForm({
    mode: 'onBlur',
  });

  const createProductItem = async (item) => {
    try{
      await addDoc(collection(db, 'products'), item);
    }catch (err){
      console.log(err);
    }
    
  };

  const onSubmit = (data) => {
    if (!productsData.find(item => item.data.sku === data.sku)){
      const item = {
        sku: data.sku,
        name: data.name,
        price: data.price
      };
      if (type === 'dvd'){
        item.units ='Size: ' + data.size + ' MB';
      }else if(type === 'furniture'){
        item.units = 'Dimension: ' + data.height + 'x' + data.width + 'x' +  data.length;
      }else{
        item.units = 'Weight: ' + data.weight + ' KG';
      }
      createProductItem(item);
      navigate('/');
    }else{
      resetField('sku')
      dispatch(showMessage('Product with the same SKU is already exists'));
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <p>Product Add</p>
        </div>
        <div className={styles.header__btns}>
          <button onClick={() => handleSubmit(onSubmit)()}>Save</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </div>
        <div className={styles.main}>
          <form id='product_form'>
          <div className={styles.field}>
            <label htmlFor="sku">SKU</label>
            <input
              {...register('sku', {
                required: 'This field is required',
              })}
              placeholder='SKU'
              autoComplete='off'
              id='sku'       
            />
          </div>
          <div className={styles.input__error}>{errors?.sku && (<p className={styles.error}>{errors.sku.message}</p>)}</div>

          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              {...register('name', {
                required: 'This field is required',
              })}
              placeholder='Name'
              autoComplete='off'
              id='name'       
            />
          </div>
          <div className={styles.input__error}>{errors?.name && (<p className={styles.error}>{errors.name.message}</p>)}</div>
          
          <div className={styles.field}>
            <label htmlFor="price">Price ($)</label>
            <input
              {...register('price', {
                required: 'This field is required',
                pattern: {
                  value: /^-?\d+\.?\d*$/,
                  message: 'Please enter valid price'
                }
              })}
              placeholder='Price'
              autoComplete='off'
              id='price'       
            />
          </div>
          <div className={styles.input__error}>{errors?.price && (<p className={styles.error}>{errors.price.message}</p>)}</div>

          <div className={styles.field}>
            <label htmlFor="switcher">Type Switcher</label>
            <select id='productType' name="switcher" onChange={e => setType(e.target.value)}>
              <option value='dvd'>DVD</option>
              <option value="furniture">Furniture</option>
              <option value="book">Book</option>
            </select>
          </div>
          
          {(type === 'dvd') &&
            <>
            <div className={styles.field}>
              <label htmlFor="size">Size (MB)</label>
              <input
                {...register('size', {
                  required: 'This field is required',
                  pattern: {
                    value: /^-?\d+\.?\d*$/,
                    message: 'Please enter valid size'
                  }
                })}
                placeholder='Size'
                autoComplete='off'
                id='size'       
              />
            </div>
            <div className={styles.input__error}>{errors?.size && (<p className={styles.error}>{errors.size.message}</p>)}</div>
            <p className={styles.description}>Please, provide size in MB</p>
            </>
          }
          {(type === 'furniture') &&
            <>
            <div className={styles.field}>
              <label htmlFor="height">Height (CM)</label>
              <input
                {...register('height', {
                  required: 'This field is required',
                  pattern: {
                    value: /^-?\d+\.?\d*$/,
                    message: 'Please enter valid height'
                  }
                })}
                placeholder='Height'
                autoComplete='off'
                id='height'       
              />
            </div>
            <div className={styles.input__error}>{errors?.height && (<p className={styles.error}>{errors.height.message}</p>)}</div>

            <div className={styles.field}>
              <label htmlFor="height">Width (CM)</label>
              <input
                {...register('width', {
                  required: 'This field is required',
                  pattern: {
                    value: /^-?\d+\.?\d*$/,
                    message: 'Please enter valid width'
                  }
                })}
                placeholder='Width'
                autoComplete='off'
                id='width'       
              />
            </div>
            <div className={styles.input__error}>{errors?.width && (<p className={styles.error}>{errors.width.message}</p>)}</div>

            <div className={styles.field}>
              <label htmlFor="height">Length (CM)</label>
              <input
                {...register('length', {
                  required: 'This field is required',
                  pattern: {
                    value: /^-?\d+\.?\d*$/,
                    message: 'Please enter valid length'
                  }
                })}
                placeholder='Length'
                autoComplete='off'
                id='length'       
              />
            </div>
            <div className={styles.input__error}>{errors?.length && (<p className={styles.error}>{errors.length.message}</p>)}</div>
            <p className={styles.description}>Please provide dimensions in HxWxL format</p>
            </>
          }
          {(type === 'book') &&
            <>
            <div className={styles.field}>
              <label htmlFor="size">Weight (KG)</label>
              <input
                {...register('weight', {
                  required: 'This field is required',
                  pattern: {
                    value: /^-?\d+\.?\d*$/,
                    message: 'Please enter valid weight'
                  }
                })}
                placeholder='Weight'
                autoComplete='off'
                id='weight'       
              />
            </div>
            <div className={styles.input__error}>{errors?.weight && (<p className={styles.error}>{errors.weight.message}</p>)}</div>
            <p className={styles.description}>Please provide weight in kilograms</p>
            </>
          }
          </form>
        </div>
     
    </>
  )
};

export default AddProduct;