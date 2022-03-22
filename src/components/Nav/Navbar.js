// this module is responsible for producing the visual representation of the Nav bar to the page

import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import Searchbar from "./SearchBar"


export const Navbar = (props) => {
    return (
        <ul className="navbar">
             <div className="navbar__Title">
                
                    <h1>My Recipes</h1>
                    
            </div>
             <ul className="navbar__item active">
                <Link className="navbar__link" to="/">My Recipe Dashboard</Link>
            </ul>
             <ul className="navbar__item active">
                <Link className="navbar__link" to="/ingredients">Ingredients</Link>
            </ul>
           
            <ul className="navbar__item active">
                <Link className="navbar__item" to="#"
                onClick={
                    () => {
                        localStorage.removeItem("cook_user")
                    }
                    
                }>
                Logout
                </Link>
            </ul>
                    <div className="navbar__search">< Searchbar /></div>  
        </ul>
    )
}
// link component will generate anchor tags
// to attribute will assign the anchor tag (h ref attribute)