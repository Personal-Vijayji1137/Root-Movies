import React from 'react';
import Styles from "./loader.module.css"

const Loader = () => {
  return (
    <div className={Styles.loaderContainer}>
      <div className={Styles.loader}></div>
    </div>
  );
};

export default Loader;