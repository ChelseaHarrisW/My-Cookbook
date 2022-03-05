// this component  has the list of recipe cards, and the create recipe buttons  which will lead to the form on 
// the function in create recipes will hold

import { useEffect, useState } from "react"
import { getAllRecipesWithDifficultyAndCategory } from "../Api-Manager"

// define a function that will be responsible for rendering the recipe information
export const RecipeList = () => {
    // define a useState variable that will allow recipe state to be used
    const [Recipes, setRecipes] = useState([])

    // create a useEffect that will be used to fetch the data on page load  

    useEffect(() => {
        getAllRecipesWithDifficultyAndCategory()
            .then(setRecipes)
    },
        []
    )

    const recipeDetails = () => {}

    return (
        <>
            <h2>Your Recipe Dashboard</h2>

            {
                Recipes.map(Recipe => {
                    return <div key={`recipe--${Recipe.id}`} className="recipe">
                        {Recipe.title} is {Recipe.category.type} and is {Recipe.difficulty.level} to make
                        {/* <button className="recipe-details-button" onClick={}> View Recipe Details</button> */}
                    </div>
                })
            }
        </>
    )

}