import React from "react";
import { Route, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { ApplicationViews } from "../ApplicationViews/ApplicationViews";
import { Login } from "../Auth/login";
import { Register } from "../Auth/register";
import { Navbar } from "../Nav/Navbar";



// ^^the functions above are importing statements that are later called below to render the corresponding import location that
// below are followed from the listed items. 
// the functions below are being called in a function called Repairs which is returning the functions ability to render the HTML to the DOM setCustomers
// see corresponding function at location.

export const Cookbook = () => (
    <BrowserRouter>
        <Route
            render={() => {
                if (localStorage.getItem("cook_user")) {
                    return (
                        <>
                            <Navbar />
                            <ApplicationViews />
                        </>
                    );
                } else {
                    return <Redirect to="/login" />;
                }
            }}
        />

        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
        </BrowserRouter>
);