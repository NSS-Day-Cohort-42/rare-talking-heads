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


    const getPostsByCat = (category_id) => {
        return fetch(`http://localhost:8088/posts?category_id=${category_id}`)
            .then(r => r.json())
            .then(setPosts)
    }

    
    const getSinglePost = (postId) => {
        return fetch(`http://localhost:8088/posts/${postId}`)
            .then(res => res.json())
    }

    const parsePostContent = (content) => content.replaceAll('</p>', '').split('<p>')

    return (
        <PostContext.Provider value={{
            posts,
            getAllPosts,
            getSinglePost,
            parsePostContent,
            createNewPost,
            getPostsByCat
        }}>
            {props.children}
        </PostContext.Provider>
    )



};