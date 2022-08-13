import React from 'react'

const CreateRecipes = () => {
  return (
    <div>
        <h1>CreateRecipes</h1>

        <div className="containerForm">
            <form action="">
                <input type="text" name="title" placeholder='Recipe Name'/>
                <textarea name="summary" cols="30" rows="10" placeholder='Recipe Description' />
                <input type="number" name="healthScore" min="1">Health Score</input>
                <label>Wrote preparation Step by Step<button>Add Step</button></label>
                <option value="">
                    <select name="" id="">dieta 1</select>
                </option>

            </form>
        </div>

    </div>
  )
}

export default CreateRecipes