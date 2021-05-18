import React from 'react';
import classes from './FilterCard.module.css';
const FilterCard = (props) => {
  return <React.Fragment>
    <div className={classes.card}>
      <section>
        <h2 className={classes['card-title']}>
          {props.title}
        </h2>
      </section>
      <span className={classes['filter-option']}>
        {/* <input type="checkbox" id="frontend" className={classes['filter-option-input']} />
        <label htmlFor="frontend" className={classes['filter-option-label']}>Frontend</label> */}
        <input type="checkbox" id="electricidad" className={classes['filter-option-input']} />
        <label htmlFor="electricidad" className={classes['filter-option-label']}>Electricidad</label>
      </span>
      <span className={classes['filter-option']}>
        {/* <input type="checkbox" id="backend" className={classes['filter-option-input']} />
        <label htmlFor="backend" className={classes['filter-option-label']}>Backend</label> */}
        <input type="checkbox" id="cerraduras" className={classes['filter-option-input']} />
        <label htmlFor="cerraduras" className={classes['filter-option-label']}>Cerraduras y Quincallería</label>
      </span>
      <span className={classes['filter-option']}>
        {/* <input type="checkbox" id="career" className={classes['filter-option-input']} />
        <label htmlFor="career" className={classes['filter-option-label']}>Career</label> */}
        <input type="checkbox" id="gasfiteria" className={classes['filter-option-input']} />
        <label htmlFor="gasfiteria" className={classes['filter-option-label']}>Gasfitería</label>
      </span>
    </div>
  </React.Fragment>
}

export default FilterCard;