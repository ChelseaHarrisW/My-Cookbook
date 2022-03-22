// this module contains the routes and corresponding functions that will direct the users

import React from "react";
import { Route } from "react-router-dom";
import { EditRecipe } from "../EditFeatures/EditRecipe";
import Searchbar from "../Nav/SearchBar";
import { CreateRecipeForm } from "../Recipe/CreateRecipe";
import { IngredientForm } from "../Recipe/IngredientForm";
import { RecipeCard } from "../Recipe/RecipeCard";
import { RecipeList } from "../Recipe/RecipeList";






export const ApplicationViews = () => {
    return (
        <>
       <Route exact path = {["/", "/recipe"]}>
           <RecipeList />
       </Route>
       <Route exact path = "/recipe/create/">
           <CreateRecipeForm />
       </Route>
       
       <Route exact path = "/ingredients">
           <IngredientForm />
       </Route>
       <Route exact path = "/search">
           < Searchbar/>
       </Route>
       <Route exact path =  "/recipe-details/:recipeId(\d+)">
           <RecipeCard />
       </Route>
       <Route exact path =  "/recipe/edit/:recipeId(\d+)">
           <EditRecipe />
       </Route>
      
        
        </>
    )
}