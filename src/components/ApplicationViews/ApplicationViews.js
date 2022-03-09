// this module contains the routes and corresponding functions that will direct the users

import React from "react";
import { Route } from "react-router-dom";
import { RecipeCard } from "../Recipe/RecipeCard";
import { RecipeList } from "../Recipe/RecipeList";






export const ApplicationViews = () => {
    return (
        <>
       <Route exact path = {["/", "/recipe"]}>
           <RecipeList />
       </Route>
       <Route exact path =  "/recipe-details/:recipeId(\d+)">
           <RecipeCard />
       </Route>
        
        </>
    )
}