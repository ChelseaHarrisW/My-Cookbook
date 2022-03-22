import { useState, useEffect } from "react"
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
export const getAllIngredients = () => {
    return fetch(`http://localhost:8088/ingredients`)
    .then(res => res.json())
}
export const getAllNotes = () => {
    return fetch(`http://localhost:8088/notes`)
    .then(res => res.json())
}
export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
    .then(res => res.json())
}


//Fetch Calls editing data that exist in the API aka
//PUT Located in the corresponding modules for readability

//Fetch calls to remove selected items from the API aka
// DELETE

export const deleteRecipeByIdOnDashboard = (id) => {
    return fetch(`http://localhost:8088/recipes/${id}`, { method: "DELETE" })
    
}
export const deleteIngredientsById = (id) => {
    return fetch(`http://localhost:8088/ingredients/${id}`, { method: "DELETE" })
    
}

// Custom React hook designed to handle my errors, loading pending ect


export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    // invoke the function
    if (method === "GET") {
      fetchData()
    }
    if (method === "POST" && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }

  }, [url, method, options])

  return { data, isPending, error, postData }
}