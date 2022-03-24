// this module is responsible for producing the visual representation of the Nav bar to the page

import React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

import { useTheme } from "../Hooks/UseTheme";


export const Navbar = (props) => {
    const { color } = useTheme();
    return (
        <ul className="navbar" style={{ backgroundImage: color }}
        >
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

        </ul>
    )
}
// link component will generate anchor tags
// to attribute will assign the anchor tag (h ref attribute)