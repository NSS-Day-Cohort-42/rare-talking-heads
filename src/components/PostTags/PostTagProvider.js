import React, { useState } from "react"

export const PostTagContext = React.createContext()

export const PostTagProvider = (props) => {
    const [postTags, setPostTags] = useState([])

    const getAllPostTags = () => {
        return fetch("http://localhost:8000/posttags", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setPostTags)
    }

    const getPostTagsByPost = (postId) => {
        return fetch(`http://localhost:8000/posttags?post_id=${postId}`, {
            headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setPostTags)
    }

    const addPostTag = (postTag) => {
        return fetch("http://localhost:8000/posttags", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postTag)
        })
    }

    const removePostTag = (postTagId) => {
        return fetch(`http://localhost:8000/posttags/${postTagId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
        })
    }

    return (
        <PostTagContext.Provider value={{postTags, addPostTag, removePostTag, getAllPostTags, getPostTagsByPost, setPostTags}}>
            {props.children}
        </PostTagContext.Provider>
    )

}