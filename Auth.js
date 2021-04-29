 import React from 'react';
import Moralis from 'moralis';

 Moralis.initialize("GTasNoqS395HyJA6JyAs5zSlJvGO2pAPMBlCSxu3");

 Moralis.serverURL = 'https://yyfjx57wpvxx.moralis.io:2053/server';





 const Auth = () => {
 
   const Signup = async (email, password) => {
     const user = new Moralis.User();
   
     user.set("username", email);
     user.set('password', password);
     user.set('email', email);
     try {
         await user.signUp();
        
     } catch (error) {
         alert( `error ${error}  ${error.message}`);
     }
   };
   const Login = async (email, password) => {
     try {
         const user = await Moralis.User.logIn(email, password);
         console.log("user llogin");
         alert(`welcome to ${user}`)
         console.log(user);
        
     } catch (error) {
             alert( `error ${error}  ${error.message}`);
     }
 };

   return (
     <>
   <from>    
       <h2>Login Required</h2>
      <input type="email" name="email" id="email"placeholder="email"></input>
      <input type="password" name="password" id="password"placeholder="password"></input>
      <button onClick={()=> Signup(document.getElementById("email").value, document.getElementById("password").value)}>Signup</button>
      <button onClick={()=> Login(document.getElementById("email").value, document.getElementById("password").value)}>Login</button>
     
     </from>

     </>
   );
 };

 export default Auth;
