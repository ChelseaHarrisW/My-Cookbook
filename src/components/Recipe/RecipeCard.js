// this component is the visual representation of a single recipe card 
// the card will show the following recipe details title of the recipe, the category type, and the difficulty level

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllRecipesWithIngredients } from "../Api-Manager"

export const RecipeCard = () => {
    //define a function called recipe card that represent a single recipe Item
    const [recipeCards, setRecipeCards] = useState([])
    const [recipe, setRecipe] = useState({})
    // declare a use state variable to manage state changes
    const { recipeId } = useParams()
    // define a useParams variable to dynamically update the url to reflect the chosen recipe card

    useEffect(
        () => {
            getAllRecipesWithIngredients(recipeId)
            .then(
                (recipesFromApi) => {
                    setRecipe(recipesFromApi[0].recipe)
                    setRecipeCards(recipesFromApi)}
                )
                //debugger
            
        }, [])

        return (
            <>
           
           
                                <>
                                  <h2   key={`title--${recipe.id}`}> {recipe?.title}  </h2>
                                <div> Ingredients you will need: </div>
                {
                    recipeCards.map(
                        (recipeCardObj) => {
                            
                            return (
                                <>
                                    <div key={`recipeCard--${recipeCardObj.id}`}> {recipeCardObj?.measurement} {recipeCardObj?.ingredient?.name}</div>
                                  
    
                                </>
                            )
                        }
                        )
                    }
                    <div   key={`title--${recipe?.id}`}> {recipe?.instructions} </div>
                  </>
                  
            </>
        )
            }
      
            // in addition each card has an 2 buttons:
            // one button is to Edit, this will take users to the view of their filled out recipe form with the option to edit
            // one is to Delete, this will remove user input from the db.json
            
            // the functions for the onclick can go into the API manager also

//         return (
//              recipeCards.map(recipeCard => { 
//             <>
//             <h2>My {recipeCards.recipe?.title} Recipe</h2>
//             <section>
//                 <div className="RecipeCategory"> {recipeCard.recipe?.title} is a level {recipeCard.recipe?.difficultyId} recipe</div>
//                 <div className="RecipeCookTime" > you will need approximately {recipeCard.recipe?.cookTime} to prepare</div>
//                 <div className="RecipeBegin" > Lets Begin</div>
//             </section>

//                 <section className="recipeCard">
//                     <div className="recipeCard__name">My {recipeCard.recipe?.title} will include: </div>
//                     <div className="recipeCard__ingredients"> {recipeCard.measurement} of {recipeCard.ingredient?.name}</div>
//                     <div className="recipeCard__instructions"> To prepare:<ol> {recipeCard.recipe?.instructions}</ol></div>
                  
//                 </section>

//                 <section>
//                     <h3>Need Ingredients?</h3>
//                     💡 Ideas are great, but come back to this section when you have completed MVP and updated the corresponding idea to a wire frame if time permits, if not the section can be counted as arbitrary and removed easily at this point. 😁 Happy Hacking!!
//                 </section>
//             </>
// })
//         )    }

//button for the re render back to recipe section
{/* <button onClick={ 
   () => history.push("/recipe")}> Back to Recipe</button> */}
