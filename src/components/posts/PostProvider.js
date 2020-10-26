import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getAllPosts = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const createNewPost = (newPost) => {
        return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json"
         },
         body: JSON.stringify(newPost)
        }).then(getAllPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, 
            getAllPosts,
            createNewPost
        }}>
            {props.children}
        </PostContext.Provider>
    )

};