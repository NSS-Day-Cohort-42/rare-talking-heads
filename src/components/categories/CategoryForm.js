import React, {useContext, useEffect, useState} from "react"

import {CategoryContext} from "./CategoryProvider"

export const CategoryForm = (props) => {
    const {createCategory, updateCategory, category, setCategory} = useContext(CategoryContext)

    const [editMode, editModeChanged] = useState(false)

    const toEdit = props.match.params.hasOwnProperty("categoryId")

    

    useEffect(() => {
        
        if (toEdit) {
            console.log(toEdit)
            editModeChanged(true)
        }
        else {
            editModeChanged(false)
        }
    }, [category])

    // const catToEdit =() => {
    //     const categoryId = parseInt(props.match.params.categoryId)
    //     const selectedCat = categories.find
    // })
    

    const handleChange = (e) => {
        const newCategory = Object.assign({}, category)
        newCategory[e.target.name] = e.target.value
        setCategory(newCategory)
        
    }

    const makeNewCategory = () => {
        if(editMode) {
            updateCategory({
                id : category.id,
                label : category.label
            }).then(props.history.push("/categories"))
        } else {
            createCategory({
                label : category.label
            }).then(props.history.push("/categories"))
        }
        setCategory({ label : ""})
    }

    return (
        <form className="CategoryForm">
            <h3 className="CategoryForm__title">{editMode ? "Update Category" : "Create Category"}</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Name :</label>
                    <input type="text" name="label" required autoFocus className="form-control"
                        value={category.label}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    makeNewCategory()
                }}
                className="btn btn-primary btn-form">
                    {editMode ? "Update" : "Save"}
                </button>
                <button className="btn btn-secondary" onClick={() => props.history.push('/categories')}>Cancel</button>
        </form>
    )


}