import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getAllPosts = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getSinglePost = (postId) => {
        // console.warn('getSinglePost called')
        return fetch(`http://localhost:8088/posts/${postId}`)
            .then(res => res.json())
    }

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, getSinglePost
        }}>
            {props.children}
        </PostContext.Provider>
    )

};