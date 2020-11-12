import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const token = localStorage.getItem("rare_user_id")

    const getAllPosts = () => {
        return fetch("http://localhost:8000/posts", {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => res.json())
            .then(setPosts)
    }

    const createNewPost = (newPost) => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
         },
         body: JSON.stringify(newPost)
        }).then(getAllPosts)
    }


    const getPostsByCat = (category_id) => {
        return fetch(`http://localhost:8000/posts?category_id=${category_id}`)
            .then(r => r.json())
            .then(setPosts)
    }

    const getPostsByUser = (user_id) => {
        return fetch(`http://localhost:8000/posts?user_id=${user_id}`)
            .then(r => r.json())
            .then(setPosts)
    }

    
    const getSinglePost = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => res.json())
    }
    
    const deletePost = (postId) => new Promise(() => {
        fetch(`http://localhost:8000/posts/${postId}`, {
            method: "DELETE"
        })
            .then(getAllPosts)
    });

    const updatePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getAllPosts)
    }

    const parsePostContent = (content) => content.replaceAll('</p>', '').split('<p>')

    return (
        <PostContext.Provider value={{
            posts,
            getAllPosts,
            getSinglePost,
            parsePostContent,
            createNewPost,
            getPostsByCat,
            getPostsByUser,
            deletePost,
            updatePost
        }}>
            {props.children}
        </PostContext.Provider>
    )



};