import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getAllCategories, getAllDifficulties, getAllRecipesWithIngredients } from "../Api-Manager"


//  use useRefs to store the value of the string information????


//return the form with the value being stored as the strings that where originally placed in


export const EditRecipe = (props) => {
    //define state variable that will store all that changes needed to edit the form.

        const [continueRecipe, setContinuedRecipe] = useState({})  // State variable for current needed to changeRecipe object
        const [difficulties, setDifficulties] = useState([])
        const [categories, setCategories] = useState([])

        const { recipeId } = useParams()  // Variable storing the route parameter
        const history = useHistory()

        useEffect(() => {
            getAllDifficulties()
                .then((difficultiesFromApi) => {
                    setDifficulties(difficultiesFromApi)
                })
        }
            , [])
        useEffect(() => {
            getAllCategories()
                .then((categoriesFromApi) => {
                    setCategories(categoriesFromApi)
                })
        }
            , [])
         
        // Fetch the individual Recipe when the parameter value s
        useEffect(
            () => {
                return fetch(`http://localhost:8088/recipes/${recipeId}`)
                    .then(response => response.json())
                    .then((data) => {
                        setChangedRecipe(data)
                    })

            },
            [recipeId]  // Above function runs when the value of RecipeId changes
        )

        // Function to invoke when an employee is chosen from <select> element
        const saveChangeRecipe = (evt) => {

            // Construct a new object to replace the existing one in the API
            const updatedChangeRecipe = {
                "title": changeRecipe.title,
                "instructions": changeRecipe.instructions,
                "cookTime": changeRecipe.cookTime,
                "difficultyId": parseInt(changeRecipe.difficultyId),
                "categoryId": parseInt(changeRecipe.categoryId),
            }

            // Perform the PUT HTTP request to replace the resource
            // use a PUT method to actually perform the operation
            fetch(`http://localhost:8088/recipes/${changeRecipe.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedChangeRecipe)
            })
                .then(() => {
                    history.push("/recipe/edit/:recipeId(/d+)")
                })
        }
        

        return (<>
            <h2 className="recipeForm__title">My New Recipe</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Title</label>
                    <input

                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What are you Making?"
                        value={changeRecipe.title}
                        onChange={
                            (evt) => {
                                const copy = { ...changeRecipe }
                                copy.title = evt.target.value
                                setChangedRecipe(copy)
                            }}

                    />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Cook time (in minutes)</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How much will you be needing?"
                        value={changeRecipe.cookTime}
                        onChange={
                            (evt) => {
                                const copy = { ...changeRecipe }
                                copy.cookTime = evt.target.value
                                setChangedRecipe(copy)
                            }}


                    />

                </div>
            </fieldset>
            <div>
                <button className="btn btn-primary" onClick={
                    () =>
                        history.push("/ingredients")
                }>

                    Add Ingredients to your Recipe
                </button>
            </div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description"> Instructions</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How do we make it?"
                        value={changeRecipe.instructions}
                        onChange={
                            (evt) => {
                                const copy = { ...changeRecipe }
                                copy.instructions = evt.target.value
                                setChangedRecipe(copy)
                            }}


                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    {difficulties.map(difficulty => {
                        return <>

                            <label htmlFor="name">{difficulty.level} </label>
                            <input type="radio"
                                id="name"
                                value={difficulty.id}
                                onChange={
                                    (evt) => {
                                        const copy = { ...changeRecipe }
                                        copy.difficultyId = parseInt(evt.target.value)
                                        setChangedRecipe(copy) // needed to track the setChangedRecipeId copies (changes in state)
                                    }
                                }
                                name="difficulty"
                            />
                        </>

                    })}



                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {categories.map(category => {
                        return <>

                            <label htmlFor="name">{category.type} </label>
                            <input type="radio"
                                id="name"
                                value={category.id}
                                name="category"
                                onChange={
                                    (evt) => {
                                        const copy = { ...changeRecipe }
                                        copy.categoryId = parseInt(evt.target.value)
                                        setChangedRecipe(copy) // needed to track the setChangedRecipeId copies (changes in state)
                                    }
                                }
                            />
                        </>

                    })}



                </div>
            </fieldset>

            <button className="btn btn-primary" onClick={
                (evt) => {
                    saveChangeRecipe(evt)
                }
            }
            >

                Submit Recipe
            </button>
        </>
        )
    
}
