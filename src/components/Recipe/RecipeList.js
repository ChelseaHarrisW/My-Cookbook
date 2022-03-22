// this component  has the list of recipe cards, and the create recipe buttons  which will lead to the form on 
// the function in create recipes will hold

import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { deleteRecipeByIdOnDashboard, getAllRecipesWithDifficultyAndCategory } from "../Api-Manager"
import { EditRecipe } from "../EditFeatures/EditRecipe"
import { RecipeCard } from "./RecipeCard"
import "./RecipeList.css"
// define a function that will be responsible for rendering the recipe information
export const RecipeList = () => {
    // define a useState variable that will allow recipe state to be used
    const [Recipes, setRecipes] = useState([])
    const history = useHistory()
    // create a useEffect that will be used to fetch the data on page load  

    useEffect(() => {
        getAllRecipesWithDifficultyAndCategory()
            .then(setRecipes)
    },
        []
    )
const deleteRecipe = (id) => {
    return deleteRecipeByIdOnDashboard(id)
    .then(() => 
        getAllRecipesWithDifficultyAndCategory()
        .then(
            (data) => {
                setRecipes(data)
                
                .then(()=> history.push(`/recipe`))
            
        })
    )
}
   

    return (
        <div className="recipe-list">
        <>
        <div>
            <h2>My Recipe Dashboard</h2>

            Welcome to the my Recipe Dashboard, Your interactive Digital CookBook Experience. The Goal of this app is to provide a free space to store unique Recipes, and promote the reduction of food waste. 
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            To begin click the "Ingredients" button to add your Ingredients with the measurements, then create your custom Recipes with preloaded, and pre-measured Ingredients
            <div className="card">  <button className="recipe-details-button" onClick={() => history.push(`/ingredients`)}> Add Ingredients Now</button> </div>
            </div>
            <button onClick={() => { history.push(`/recipe/create/`) }}> My New Recipe</button>
            {
                Recipes.map(Recipe => {
                    return <div key={`recipe--${Recipe.id}`} className="card">
                     <h3>{Recipe.title}</h3>  is in the {Recipe.category.type} category, and is {Recipe.difficulty.level} to prepare
                      <div className="card">  <button className="recipe-details-button" onClick={() => history.push(`/recipe-details/${Recipe.id}`)}> View Recipe Details</button> </div>
                      <div className="card">  <button className="recipe-details-button" onClick={() => deleteRecipe(Recipe.id)}> Delete</button> </div>
                      <div className="card">  <button className="recipe-details-button" onClick={() => history.push(`/recipe/edit/${Recipe.id}`)}> Edit</button> </div>
                    </div>
                })
            }
        </>
        </div>
    )

}

// in addition each card has an 2 buttons:
// one button is to Edit, this will take users to the view of their filled out recipe form with the option to edit
// one is to Delete, this will remove user input from the db.json
// and one is to "go to Recipe" this will allow users to view recipe details