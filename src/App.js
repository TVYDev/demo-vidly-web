import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
   return (
      <React.Fragment>
         <Navbar />
         <main className="container" style={{ marginTop: "20px" }}>
            <Switch>
               <Route path="/register" component={RegisterForm} />
               <Route path="/login" component={LoginForm} />
               <Route path="/movies/:id" component={MovieForm} />
               <Route path="/movies" component={Movies} />
               <Route path="/customers" component={Customers} />
               <Route path="/rentals" component={Rentals} />
               <Route path="/not-found" component={NotFound} />
               <Redirect from="/" exact to="/movies" />
               <Redirect to="/not-found" />
            </Switch>
         </main>
      </React.Fragment>
   );
}

export default App;
