// this module is responsible for producing the visual representation of the Nav bar to the page

import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"


export const Navbar = (props) => {
    return (
        <ul className="navbar">
             <li className="navbar__item active">
                <Link className="navbar__link" to="/">My Recipe Dashboard</Link>
            </li>
             <li className="navbar__item active">
                <Link className="navbar__link" to="/ingredients">Ingredients</Link>
            </li>
           
            <li className="navbar__item active">
                <Link className="navbar__item" to="#"
                onClick={
                    () => {
                        localStorage.removeItem("cook_user")
                    }
                    
                }>
                Logout
                </Link>
            </li>
        </ul>
    )
}
// link component will generate anchor tags
// to attribute will assign the anchor tag (h ref attribute)