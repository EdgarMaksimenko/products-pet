import styles from './PopUp.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { closePopUp } from '../../store/slices/popUpSlice';

const PopUp = () => {
  const { isActive, message } = useSelector((state) => state.popUp);
  const dispatch = useDispatch();

  return (
    <div className={isActive ? styles.popup + ' ' + styles.active : styles.popup}>
      <div className={styles.popup__inner}>
        <span className={styles.close} onClick={() => dispatch(closePopUp())}></span>
        <p>{message}</p>
      </div>
    </div>
  )
};

export default PopUp;