//this component is responsible for creating the visual representation of form that populates when the "New Recipe button"
// that will lead to the recipe form where users can input recipe information
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const CreateRecipeForm = () => {
    const [recipe, setRecipe] = useState({ // update is the setter fx, it will be how we update the employee  info to API
            "title": "",
            "ingredient": "",
            "measurement":"",
            "cookTime": "",
            "difficultyId": "",
            "categoryId": "",
        });

        const history = useHistory()
        
        const saveRecipe = (SubmitRecipeClicked) => {
            SubmitRecipeClicked.preventDefault()
    
            const submitRecipe = {
                "title": recipe.title,
                "measurement":recipe.measurement,
                "ingredients": recipe.ingredient.name,
                "cookTime": recipe.cookTime,
                "difficultyId": parseInt(recipe.difficultyId),
                "categoryId": parseInt(recipe.categoryId),
            }
            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(submitRecipe)
            }
            return fetch("http://localhost:8088/recipes?_expand=difficulty&_expand=category", fetchOption)
                .then(() => {
                    history.push(["/", "/recipe"])
                })
        }
        return (
            <form className="recipeForm">
                <h2 className="recipeForm__title">My New Recipe</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Title</label>
                        <input
                            
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="What are you Making?"
                            onChange={
                                (evt) => {
                                    const copy = { ...recipe }
                                    copy.name = evt.target.checked
                                    update(copy)
                                }}
                            
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Ingredient</label>
                        <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What item will you need?"
                        
                        onChange={
                            (evt) => {
                                const copy = { ...recipe }
                                copy.location = evt.target.value
                                update(copy)
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
                        
                        onChange={
                            (evt) => {
                                const copy = { ...recipe }
                                copy.location = evt.target.value
                                update(copy)
                            }}
                        
    
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Cook time</label>
                        <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How much will you be needing?"
                        
                        onChange={
                            (evt) => {
                                const copy = { ...recipe }
                                copy.location = evt.target.value
                                update(copy)
                            }}
                        
    
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Cook Time</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="How long will it take to cook this item?"
                            onChange={
                                (evt) => {
                                    const copy = { ...recipe }
                                    copy.hourlyRate = evt.target.value
                                    update(copy)
                                }
    
                            }
    
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Difficulty:</label>
                        <input type="radio"
                            onChange={(evt) => {
                                const copy = { ...recipe }
                                copy.fullTime = Boolean(evt.target.value)
                                update(copy) // needed to track the updated copies (changes in state)
                            }
    
                            }
                            type="radio" />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name"> Category:</label>
                        <input type="radio"
                            onChange={(evt) => {
                                const copy = { ...recipe }
                                copy.manager = evt.target.checked
                                update(copy) // needed to track the updated copies (changes in state)
                            }
    
                            }
                            type="radio" />
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={saveRecipe}>
                    Submit Recipe
                </button>
            </form>
        )
    }
            

// the form at the end of the destination will ask the user to input:

// recipe title, Instructions, cook time and recipe's Ingredients, and Instructions
// then the user can select from a dropdown for the recipe difficulty
// and select a category from the radio button selection