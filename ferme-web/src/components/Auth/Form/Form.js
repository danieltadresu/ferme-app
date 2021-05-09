import PropTypes from 'prop-types';
import classes from './Form.module.css';

const Form = (props) => {

  const loginHandler = (event) => {
    props.login(event);
  }

  return (
    <>
      <section className={classes.container_login}>
        <div>
          <form className={classes.form} onSubmit={loginHandler}>
            <div className={classes.form_item}>
              <label>
                Email
              </label>
              <input type="email" />
            </div>
            <div className={classes.form_item}>
              <label>
                Contraseña
              </label>
              <input type="password" />
            </div>
            <div className={classes.form_item}>
              <button className={classes.button}>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </section>
    </>    
  )
};


Form.propTypes = {
  login: PropTypes.func,
};

Form.defaultProps = {
  login: () => {},
};

export default Form;