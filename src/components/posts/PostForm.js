import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { CategoryContext } from "../categories/CategoryProvider"

export const PostForm = (props) => {
    const { createNewPost, updatePost, getAllPosts, posts } = useContext( PostContext )
    const { getAllCategories, categories } = useContext( CategoryContext )


    // Get all the categories to populate the select dropdown
    useEffect(() => {
        getAllCategories()
        getAllPosts()
    }, [])

    
    
    // the following state is for compontent state
    const [post, setPost] = useState({})
    
    // is there a URL parameter of postId???
    const editMode = props.match.params.hasOwnProperty("postId") // true or false
    
    useEffect(() => {
        getPostInEditMode()
    }, [posts])

    // if in edit mode, get the post that matched the postId
    const getPostInEditMode = () => {
        if (editMode) {
            const postId = parseInt(props.match.params.postId)
            const postToEdit = posts.find(p => p.id === postId) || {}
            setPost(postToEdit)
        }
    }
    

    const handleControlledInputChange = (e) => {
        const newPost = Object.assign({}, post)     // Create a copy
        newPost[e.target.name] = e.target.value     // Modify copy
        setPost(newPost)
    }

    const constructNewPost = () => {
        if (editMode) {
            updatePost({
                id: post.id,
                title: post.title,
                content: post.content,
                image_url: post.image_url,
                category_id: parseInt(post.category_id)
            })
                .then(() => props.history.push("/"))
        } else {
            createNewPost({
                title: post.title,
                content: post.content,
                publication_date: Date.now(),
                image_url: post.image_url,
                category_id: parseInt(post.category_id),
                approved: true
            })
                .then(() => props.history.push("/"))
        }
    }

    return (
        <form className="PostForm">
            <h3 className="PostForm__header">{editMode ? "Edit Your Post" : "Create a New Post"}</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title :</label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        placeholder="Post title"
                        defaultValue={post.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content :</label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        placeholder="Post content"
                        defaultValue={post.content}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="header_img">Header Image URL :</label>
                    <input type="text" name="header_img" required autoFocus className="form-control"
                        placeholder="Post header image URL"
                        defaultValue={post.image_url}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category_id">Category: </label>
                    <select name="category_id" className="form-control"
                        proptype="int"
                        value={post.category_id}
                        onChange={handleControlledInputChange}>

                            <option value="0">Select a category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    constructNewPost()
                }}
                className="btn btn-form">
                    {editMode ? "Save Updates" : "Save New Post"}
                </button>
        </form>
    )
}