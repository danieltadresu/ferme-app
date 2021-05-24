import React from 'react';
import classes from './Button.module.css';
const Button = (props) => {
  const type = props.type;
  console.log('type :>> ', type);
  return <React.Fragment>
    <button className={classes.success}>
      {props.title}
    </button>
  </React.Fragment>
}

export default Button;