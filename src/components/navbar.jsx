import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
   render() {
      return (
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
               Vidly
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <NavLink className="nav-link" to="/movies">
                        Movies
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink className="nav-link" to="/customers">
                        Customers
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink className="nav-link" to="/rentals">
                        Rentals
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink className="nav-link" to="/login">
                        Login
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink className="nav-link" to="/register">
                        Register
                     </NavLink>
                  </li>
               </ul>
            </div>
         </nav>
      );
   }
}

export default Navbar;
