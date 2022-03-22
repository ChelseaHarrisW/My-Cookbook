
import { useEffect, useState } from "react"
import { Button } from "reactstrap"

import "./SearchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from "react-router-dom";

const SearchBar = ({ toggleSearchBar }) => {
    const [recipe, setRecipe] = useState([])
    const [searchResults, updateSearchResults] = useState([])
    const [userInput, updateUserInput] = useState("")
    const history = useHistory()

    useEffect(() => {
        RecipeRepositiory.getAll().then(setRecipe)
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
            <h4>Let's find a recipe!</h4>
            <div className="searchInput">
                <input type="text" autoFocus value={userInput} onChange={handleSearch} />
                <div className="searchIcon">
                    {searchResults.length ? <CloseIcon id="clearBtn" onClick={clearInput} /> : <SearchIcon />}
                </div>
            </div>{
                searchResults.length
                    ?
                    <div className="searchResults">
                        {
                            searchResults.slice(0, 15).map((recipe, key) => {
                                return (
                                    <div key={recipe.id} className="bookItem" onClick={() => history.push(`/search/${recipe.id}`)}>
                                        <div>{recipe.title}</div>
                                        <div>By {recipe.author}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    : ""
            }
            <div><Button className="exitSearchBtn" onClick={() => toggleSearchBar(false)}>Can't find the recipe you're after?</Button></div>
        </div>
    )
}
export default SearchBar