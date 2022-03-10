// this component  has the list of recipe cards, and the create recipe buttons  which will lead to the form on 
// the function in create recipes will hold

import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { getAllRecipesWithDifficultyAndCategory } from "../Api-Manager"

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

   

    return (
        <>
            <h2>My Recipe Dashboard</h2>
            <button onClick={() => { history.push("/recipe/create") }}>+ My New Recipe</button>
            {
                Recipes.map(Recipe => {
                    return <div key={`recipe--${Recipe.id}`} className="recipe">
                      {Recipe.title} is {Recipe.category.type} and is {Recipe.difficulty.level} to make
                        <button className="recipe-details-button" onClick={() => history.push(`/recipe-details/${Recipe.id}`)}> View Recipe Details</button> 
                    </div>
                })
            }
        </>
    )

}

// in addition each card has an 2 buttons:
// one button is to Edit, this will take users to the view of their filled out recipe form with the option to edit
// one is to Delete, this will remove user input from the db.json
// and one is to "go to Recipe" this will allow users to view recipe details