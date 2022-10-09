import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.circle}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
};

export default Loading;