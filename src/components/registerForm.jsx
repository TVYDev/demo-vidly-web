import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
   state = {
      data: {
         username: "",
         password: "",
         name: ""
      },
      errors: {}
   };

   schema = {
      username: Joi.string()
         .email()
         .required()
         .label("Username"),
      password: Joi.string()
         .required()
         .min(5)
         .label("Password"),
      name: Joi.string()
         .required()
         .label("Name")
   };

   doSubmit = () => {
      console.log("Submitted");
   };

   render() {
      return (
         <div>
            <h3>Register</h3>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput("username", "Username", "email")}
               {this.renderInput("password", "Password", "password")}
               {this.renderInput("name", "Name")}
               {this.renderButton("Login")}
            </form>
         </div>
      );
   }
}

export default RegisterForm;
