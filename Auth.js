// import React from 'react';
// import Moralis from 'moralis';

// Moralis.initialize("GTasNoqS395HyJA6JyAs5zSlJvGO2pAPMBlCSxu3");

// Moralis.serverURL = 'https://yyfjx57wpvxx.moralis.io:2053/server';





// const Auth = () => {
 
//   const Signup = async (email, password) => {
//     const user = new Moralis.User();
   
//     user.set("username", email);
//     user.set('password', password);
//     user.set('email', email);
//     try {
//         await user.signUp();
        
//     } catch (error) {
//         alert( `error ${error}  ${error.message}`);
//     }
//   };
//   const Login = async (email, password) => {
//     try {
//         const user = await Moralis.User.logIn(email, password);
//         console.log("user llogin");
//         alert(`welcome to ${user}`)
//         console.log(user);
        
//     } catch (error) {
//             alert( `error ${error}  ${error.message}`);
//     }
// };

//   return (
//     <>
//   <from>    
//       <h2>Login Required</h2>
//      <input type="email" name="email" id="email"placeholder="email"></input>
//      <input type="password" name="password" id="password"placeholder="password"></input>
//      <button onClick={()=> Signup(document.getElementById("email").value, document.getElementById("password").value)}>Signup</button>
//      <button onClick={()=> Login(document.getElementById("email").value, document.getElementById("password").value)}>Login</button>
     
//     </from>

//     </>
//   );
// };

// export default Auth;

import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
  );
};

export default Auth;
