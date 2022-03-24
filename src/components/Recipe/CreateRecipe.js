//this component is responsible for creating the visual representation of form that populates when the "New Recipe button"
// that will lead to the recipe form where users can input recipe information
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { getAllDifficulties, getAllCategories, getAllIngredients } from "../Api-Manager"
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@mui/base/TextareaAutosize';
export const CreateRecipeForm = () => {
    const [recipe, setRecipe] = useState([])
    const [title, setTitle] = useState("")
    const [cookTime, setCookTime] = useState("")
    const [instructions, setInstructions] = useState("")
    const [difficulties, setDifficulties] = useState([])
    const [categories, setCategories] = useState([])
    const [ingredientUpdate, setIngredientUpdate] = useState([])
    const [ingredient, setIngredient] = useState([])
    const { recipeId } = useParams()
    const history = useHistory()
    // get the catagories, and difficulty to store in state variables

    // GET and set radio button options

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
    useEffect(() => {
        getAllIngredients()
            .then((ingredientUpdateFromApi) => {
                setIngredientUpdate(ingredientUpdateFromApi)
            })
    }
        , [])
    // creating the obj to send into the API and Post

    const saveRecipe = (SubmitRecipeClicked) => {

        SubmitRecipeClicked.preventDefault()

        const submitRecipe = {
            "title": recipe.title,
            "cookTime": recipe.cookTime,
            "instructions": recipe.instructions,
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
        return fetch("http://localhost:8088/recipes", fetchOption)
            .then((data) => data.json())
            .then((recipe) => {
                ingredient.forEach(ingredient => {
                    const newRecipeIngredientObj = {
                        "recipeId": parseInt(recipe.id),
                        "ingredientId": parseInt(ingredient)
                    }
                    const fetchOption = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newRecipeIngredientObj)
                    }
                    return fetch("http://localhost:8088/recipeIngredients", fetchOption)
                })
                // for ingredients you're going to need a .then and post each ingredient
            }).then(() => history.push("/"))
    }

    // define state variable [] (ingredientUpdate)
    // when button is clicked clear boxes

    // when we click the box update the new state variable state and render the new state to the html

    // map the array to html objs that will display a list

    // render check box as ingredients

    return (
        <>
            <h2 className="recipeForm__title">My New Recipe</h2>
            <form>

                <div className="form-group">
                    <label htmlFor="description"><h3>Title</h3></label>
                    <TextField
    style={{ height: 50, width: 1000 }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What are you Making?"
                        onChange={
                            (evt) => {
                                const copy = { ...recipe }
                                copy.title = evt.target.value
                                setRecipe(copy)
                            }}

                    />
                </div>
            </form>


            <form>
                <div className="form-group">
                    <label htmlFor="description"><h3>Cook time</h3> <div>(in minutes)</div></label>
                    <TextField
                    style={{ height: 50, width: 1000 }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How much will you be needing?"

                        onChange={
                            (evt) => {
                                const copy = { ...recipe }
                                copy.cookTime = evt.target.value
                                setRecipe(copy)
                            }}


                    />

                </div>
            </form>

            <form>

                <div className="form-group">
                    <label htmlFor="description"> <h3>Instructions</h3></label>
                    <TextareaAutosize

                        style={{ height: 300, width: 1000 }}

                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How do we make it?"

                        onChange={
                            (evt) => {
                                const copy = { ...recipe }
                                copy.instructions = evt.target.value
                                setRecipe(copy)
                            }}


                    />
                </div>
            </form>

            <form>
                <h3>Difficulty Level</h3>
                <div className="form-group">
                    {difficulties.map(difficulty => {
                        return <>

                            <label htmlFor="name">{difficulty.level} </label>
                            <input type="radio"
                                id="name"
                                value={difficulty.id}
                                onChange={
                                    (evt) => {
                                        const copy = { ...recipe }
                                        copy.difficultyId = parseInt(evt.target.value)
                                        setRecipe(copy) // needed to track the setRecipeId copies (changes in state)
                                    }
                                }
                                name="difficulty"
                            />
                        </>

                    })}



                </div>
            </form>
            <form>
                <h3> SelectCategory</h3>
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
                                        const copy = { ...recipe }
                                        copy.categoryId = parseInt(evt.target.value)
                                        setRecipe(copy) // needed to track the setRecipeId copies (changes in state)
                                    }
                                }
                            />
                        </>

                    })}



                </div>
            </form>

            <h3>Do you have everything you need?:</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="name"> <div>{ingredientUpdate.map(item => {
                        return (
                            <div key={`new--items-${item.id}`}>{item.name}
                                <input type="checkbox"
                                    id={item.id}
                                    onChange={(evt) => {
                                        const copy = [...ingredient]
                                        copy.push(evt.target.id)
                                        setIngredient(copy) // needed to track the updated copies (changes in state)
                                    }

                                    }
                                />
                            </div>)
                    })}
                    </div>
                    </label>
                </div>
            </form>


            <button className="btn btn-primary" onClick={
                (evt) => {
                    saveRecipe(evt)
                }
            }
            >

                Submit Recipe
            </button>
        </>
    )
}


// the form at the end of the destination will ask the user to input:

// recipe title, Instructions, cook time and recipe's Ingredients, and Instructions
// then the user can select from a dropdown for the recipe difficulty
// and select a category from the radio button selection