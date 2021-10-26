import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div
      className={classes.spinner}
      style={{ marginLeft: '50%', marginTop: '10%' }}
    ></div>
  );
};

export default LoadingSpinner;
