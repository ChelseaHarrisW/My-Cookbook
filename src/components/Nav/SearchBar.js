// import { useState } from 'react'
// import { useHistory } from 'react-router-dom'

// // styles
// import './SearchBar.css'

// export default function Searchbar() {
//     // state variable term to track the state for the user inputs to the search bar
//   const [term, setTerm] = useState('')
//   const history = useHistory()

//   const handleSearch = (e) => {
//     e.preventDefault()
//     // once user completes a search redirect them to the link below
//     history.push(`/search?q=${term}`)
//   }

//   return (
//     <div className="searchbar">
//       <form onSubmit={handleSearch}>
//         <label htmlFor="search">Search:</label>
//         <input 
//           id="search" 
//           type="text" 
//           onChange={(e) => setTerm(e.target.value)} 
//           required 
//         />
//       </form>
//     </div>
//   )
// }


import { useEffect, useState } from "react"


import "./SearchBar.css"
import { useHistory } from "react-router-dom";
import { getAllRecipesWithDifficultyAndCategory, getAllRecipesWithIngredients } from "../Api-Manager";

const SearchBar = ({ toggleSearchBar }) => {
    const [recipe, setRecipe] = useState([])
    const [searchResults, updateSearchResults] = useState([])
    const [userInput, updateUserInput] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            getAllRecipesWithIngredients()
            .then(
                (recipesFromApi) => {
                    setRecipe(recipesFromApi)}
                )
                //debugger
            
        }, [])

    const handleSearch = (event) => {
        const searchCriteria = event.target.value
        updateUserInput(searchCriteria)
        const filteredRecipe = recipe.filter(recipe => recipe.title.toLowerCase().includes(searchCriteria.toLowerCase()) || recipe.title.toLowerCase().includes(searchCriteria.toLowerCase()))
        if (searchCriteria === "") {
            updateSearchResults([])
        }
        else {
            updateSearchResults(filteredRecipe)
        }
    }

    const clearInput = () => {
        updateSearchResults([])
        updateUserInput("")
    }

    return (
        <div className="search">
            <h4>Search </h4>
            <div className="searchInput">
                <input type="text" autoFocus value={userInput} onChange={handleSearch} />
                
            </div>{
                searchResults.length
                    ?
                    <div className="searchResults">
                        {
                            searchResults.slice(0, 15).map((recipe, key) => {
                                return (
                                    <div key={recipe.id} className="bookItem" onClick={() => history.push(`/search/${recipe.id}`)}>
                                        <div>{recipe.title}</div>
                                        <div> {recipe.instructions}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : ""
            }
        </div>
    )
}
export default SearchBar