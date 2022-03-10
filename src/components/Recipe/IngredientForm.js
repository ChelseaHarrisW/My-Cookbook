// this component will be  the ingredients form
// responsible for updating the ingredient objects state
import React, { useEffect, useState } from "react"

export const IngredientForm = () => {
    const [ingredient, setIngredient] = useState({
        "name": "",
        "measurement": ""
    })
    const [ingredientUpdate, setIngredientUpdate] = useState([])



    const saveIngredient = (SubmitIngredientClicked) => {

        //  SubmitIngredientClicked.preventDefault()

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
        return fetch("http://localhost:8088/ingredients", fetchOption)
            .then(() => {
                const copy = [...ingredientUpdate]
                copy.push(submitIngredient)
                setIngredientUpdate(copy)
                setIngredient({
                    "name": "",
                    "measurement": ""
                })
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
        <h3>Do you have everything you need?:</h3>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name"> <div>{ingredientUpdate.map(ingredient => {
                    return (
                        <div>{ingredient.name}
                            <input type="checkbox"
                                onChange={(evt) => {
                                    const copy = { ...ingredient }
                                    copy.name = Boolean(evt.target.value)
                                    setIngredientUpdate(copy) // needed to track the updated copies (changes in state)
                                }

                                }
                            />
                        </div>)
                })}
                </div>
                </label>
            </div>
        </fieldset>
       
    </>

    )
}