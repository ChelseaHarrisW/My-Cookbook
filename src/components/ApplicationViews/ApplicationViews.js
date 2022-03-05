// this module contains the routes and corresponding functions that will direct the users

import React from "react";
import { Route } from "react-router-dom";
import { RecipeList } from "../Recipe/RecipieList";






export const ApplicationViews = () => {
    return (
        <>
       <Route exact path = {["/", "/recipe"]}>
           <RecipeList />
       </Route>
        
        </>
    )
}