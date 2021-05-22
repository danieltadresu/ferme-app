import React from 'react';
import classes from './Card.module.css';
const Card = (props) => {
  return <React.Fragment>
    <div className={classes.card}>
      <section>
        <h2 className={classes['card-title']} style={{ fontFamily: 'Arial, sans-serif;'}}>
          {props.title}
        </h2>
      </section>
    </div>
  </React.Fragment>
}

export default Card;