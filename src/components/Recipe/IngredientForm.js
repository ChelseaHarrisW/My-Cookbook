// this component will be  the ingredients form
// responsible for updating the ingredient objects state
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const IngredientForm = () => {
    const [ingredient, setIngredient] = useState({
        "name": "",
        "measurement": ""
    })
    const [ingredientUpdate, setIngredientUpdate] = useState([])
    const [Recipe, setRecipe] = useState({})
    const { recipeId } = useParams()
    const history = useHistory()


    const saveIngredient = (SubmitIngredientClicked) => {

         SubmitIngredientClicked.preventDefault()

        const submitIngredient = {
            "name": ingredient.name,
            "measurement": ingredient.measurement
        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submitIngredient)
        }
        return fetch("http://localhost:8088/ingredients/", fetchOption)
            .then(() => {
                const copy = [...ingredientUpdate]
                copy.push(submitIngredient)
                setIngredientUpdate(copy)
                setIngredient({
                    "name": "",
                    "measurement": "",
                })
            })
        }
        const saveAddedIngredientsToRecipe = (evt) => {

            // Construct a new object to replace the existing one in the API
            const updatedChangeRecipe = {
                "title": Recipe.title,
                "cookTime": Recipe.cookTime,
                "instructions": Recipe.instructions,
                "difficultyId": parseInt(Recipe.difficultyId),
                "categoryId": parseInt(Recipe.categoryId),
            }

            // Perform the PUT HTTP request to replace the resource
            // use a PUT method to actually perform the operation
            fetch(`http://localhost:8088/recipes/${Recipe.id}`, {
                method: "POST",
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
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Ingredient</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="What item will you need?"
                    value={ingredient.name}
                    onChange={
                        (evt) => {
                            const copy = { ...ingredient }
                            copy.name = evt.target.value
                            setIngredient(copy)
                        }}
                />

            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Measurement</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="How much will you be needing?"
                    value={ingredient.measurement}
                    onChange={
                        (evt) => {
                            const copy = { ...ingredient }
                            copy.measurement = evt.target.value
                            setIngredient(copy)
                        }}
                />
                <button onClick={saveIngredient}>add Item</button>


            </div>
        </fieldset>
        <h3>Ingredient List:</h3>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name"> <div>{ingredientUpdate.map(ingredient => {
                    return (
                        <div key={`new--ingredients-${ingredient.id}`}>{ingredient.name}
                            {/* <input type="checkbox"
                                onChange={(evt) => {
                                    const copy = { ...ingredient }
                                    copy.name = Boolean(evt.target.value)
                                    setIngredientUpdate(copy) // needed to track the updated copies (changes in state)
                                }

                                }
                            /> */}
                        </div>)
                })}
                </div>
                </label>
            </div>
        </fieldset>
        
    </>


    )
}

// when items are added save to api as ingredient for recipe

// post

// in recipe form  iterate the ingredients array create a checkbox for each one