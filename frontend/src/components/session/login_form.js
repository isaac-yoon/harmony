import React from 'react';
import { withRouter } from 'react-router-dom';
import formStyle from './form.module.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  // Once the user has been authenticated, redirect to the current page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors })
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  
  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    
    let user = {
      handle: this.state.handle,
      password: this.state.password
    };

    this.props.login(user)
  }
  
  // demo login ghost typewriter
  demoLogin(e) {
    e.preventDefault();

    const { login } = this.props;

    const handleInput = document.getElementById('login-handle');
    const passwordInput = document.getElementById('login-password');

    const demoHandle = "HarmonyDemoUser";
    const demoPassword = "12345678";

    let handleIndex = 0;
    let passwordIndex = 0;

    const typePassword = () => {
      if (passwordIndex <= demoPassword.length) {
        passwordInput.value = demoPassword.substr(0, passwordIndex ++);
        setTimeout(() => typePassword(), 50);
      } else {
        setTimeout(() => login({
          handle: 'HarmonyDemoUser',
          password: '123456'
        }), 1)
      }
    }

    const typeHandle = () => {
      if (handleIndex <= demoHandle.length) {
        handleInput.value = demoHandle.substr(0, handleIndex++);
        setTimeout(() => typeHandle(), 75);
      } else {
        typePassword()
      }
    }

    typeHandle();
    
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul className={formStyle.outerErrors}>
        {Object.keys(this.state.errors).map((error, i) => (
          <li className={formStyle.errors} key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className={formStyle.formcontainer}>
        <form 
          onSubmit={this.handleSubmit} 
          className={formStyle.form}
        >
          <div className={formStyle.formCenteringBox}>

          <div className={formStyle.formHeader}>Log In</div>
         
            <div className={formStyle.formContents}>
            <div className={formStyle.formInputText}>Handle:</div>
            <input 
              type="text"
              value={this.state.handle}
              onChange={this.update('handle')}
              placeholder="Type your handle"
              className={formStyle.formInput}
              id="login-handle"
              />

      
            <div className={formStyle.formInputText}>Password:</div>
            <input type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Type your password"
              className={formStyle.formInput}
              id="login-password"
              />

         
            <div className={formStyle.formButtonsContainer}>
              <input 
                type="submit" 
                value="Submit"
                className={formStyle.formSubmitButton}
                />

          
              <input
                type="submit"
                onClick={this.demoLogin}
                value="Demo Login"
                className={formStyle.formSubmitButton}
                />
            </div>

            {this.renderErrors()}
          </div>
          </div>
        </form>

        <div className={formStyle.placeholder}></div>
      </div>
    );
  }
}

export default withRouter(LoginForm);