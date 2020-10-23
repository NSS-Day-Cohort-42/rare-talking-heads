import React, {useContext, useEffect} from "react"

import {CategoryContext} from "./CategoryProvider"

export const CategoryForm = (props) => {
    const {createCategory, updatedCategory, category, setCategory} = useContext(CategoryContext)

    const [editMode, editModeChanged] = useState(false)

    useEffect(() => {
        if ('id' in category) {
            editModeChanged(true)
        }
        else {
            editModeChanged(false)
        }
    }, [category])



    const handleChange = (e) => {
        const newCategory = Object.assign({}, category)
        newCategory[e.target.name] = e.target.value
        setCategory(newCategory)
    }

    const makeNewCategory = () => {
        if(editMode) {
            updatedCategory({
                id = category.id,
                name = category.name
            })
        } else {
            createCategory({
                name : category.name
            })
        }
        setCategory({ name : ""})
    }

    return (
        <form className="CategoryForm">
            <h3 className="CategoryForm__title">{editMode ? "Update Category" : "Create Category"}</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name :</label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={category.name}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    makeNewCategory()
                }}
                className="btn btn-form">
                    {editMode ? "Update" : "Save"}
                </button>
        </form>
    )


}