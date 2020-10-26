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
        return fetch(`http://localhost:8088/posts/${postId}`)
            .then(res => res.json())
    }

    const parsePostContent = (content) => content.replaceAll('</p>', '').split('<p>')

    return (
        <PostContext.Provider value={{
            posts, getAllPosts, getSinglePost, parsePostContent
        }}>
            {props.children}
        </PostContext.Provider>
    )

};