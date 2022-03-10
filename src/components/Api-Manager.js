import { useHistory } from "react-router-dom"

// this module is responsible for storing the fetch calls that will later be invoked in order to retrieve data from the API server

//Fetch Calls pulling in desired data aka
//GET
export const getAllRecipesWithDifficultyAndCategory = () => {
    return fetch(`http://localhost:8088/recipes?_expand=difficulty&_expand=category`)
    .then(res => res.json())
}
export const getAllRecipesWithIngredients = (recipeId) => {
    return fetch(`http://localhost:8088/recipeIngredients/?_expand=recipe&_expand=ingredient&recipeId=${recipeId}`)
    .then(res => res.json())
}
export const getAllDifficulties = () => {
    return fetch(`http://localhost:8088/difficulties`)
    .then(res => res.json())
}
export const getAllCategories = () => {
    return fetch(`http://localhost:8088/categories`)
    .then(res => res.json())
}
export const getAllFavoritesByUser = () => {
    return fetch(`http://localhost:8088/userFavorites?_expand=user`)
    .then(res => res.json())
}

//Fetch calls posting new data to the API aka
//POST

export const saveRecipe = (SubmitRecipeClicked) => {
    
    SubmitRecipeClicked.preventDefault()
    
    const submitRecipe = {
        "title": SubmitRecipeClicked.title,
        "measurement":SubmitRecipeClicked.measurement,
        "ingredients": SubmitRecipeClicked.ingredient.name,
        "cookTime": SubmitRecipeClicked.cookTime,
        "difficultyId": parseInt(SubmitRecipeClicked.difficultyId),
        "categoryId": parseInt(SubmitRecipeClicked.categoryId),
    }
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submitRecipe)
    }
    return fetch("http://localhost:8088/recipes?_expand=difficulty&_expand=category", fetchOption)
}


//Fetch Calls editing data that exist in the API aka
//PUT

//Fetch calls to remove selected items from the API aka
// DELETE