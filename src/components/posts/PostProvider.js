import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getAllPosts = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }


    const getPostsByCat = (category_id) => {
        return fetch(`http://localhost:8088/posts?category_id=${category_id}`)
            .then(r => r.json())
            .then(setPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, getPostsByCat
        }}>
            {props.children}
        </PostContext.Provider>
    )



};