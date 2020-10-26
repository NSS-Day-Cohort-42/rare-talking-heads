import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"

export const PostForm = (props) => {
    const { createPost } = useContext( PostContext )
    const { getAllCategories, categories } = useContext( CategoryContext )

    // Get all the categories to populate the select dropdown
    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <form className="PostForm">
            <h3 className="PostForm__header">Create New Post</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title :</label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={null}
                        onChange={null}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categoryId">Category: </label>
                    <select name="categoryId" className="form-control"
                        proptype="int"
                        value={null}
                        onChange={null}>

                            <option value="0">Select a category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {}}
                className="btn btn-form">
                    Save
                </button>
        </form>
    )
}