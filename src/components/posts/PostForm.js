import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"

export const PostForm = (props) => {
    const { createPost } = useContext( PostContext )
    const { getAllCategories, categories } = useContext( CategoryContext )

    const currentDay = new Date
    console.log(currentDay)

    // Get all the categories to populate the select dropdown
    useEffect(() => {
        getAllCategories()
    }, [])

    // the following state is for compontent state
    const [post, setPost] = useState({})

    const handleControlledInputChange = (e) => {
        const newPost = Object.assign({}, post)     // Create a copy
        newPost[e.target.name] = e.target.value     // Modify copy
        setPost(newPost)
    }

    const constructNewPost = () => {
        const userId = parseInt(localStorage.getItem("rare_user_id"))

        createPost({
            title: post.title,
            content: post.content,
            pubdate: null
        })
    }

    return (
        <form className="PostForm">
            <h3 className="PostForm__header">Create New Post</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title :</label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={post.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content :</label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        value={post.content}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categoryId">Category: </label>
                    <select name="categoryId" className="form-control"
                        proptype="int"
                        value={null}
                        onChange={handleControlledInputChange}>

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