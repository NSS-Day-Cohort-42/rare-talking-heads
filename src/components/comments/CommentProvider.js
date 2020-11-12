import React, {useState} from "react"

export const CommentContext = React.createContext()

export const CommentProvider = props => {
    const [comments, setComments] = useState([])

    const getCommentsByPost = (post_id) => {
        return fetch(`http://localhost:8000/comments?post_id=${post_id}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(r => r.json())
        .then(setComments)
    }

    const createComment = (newComment) => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers : { 
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type" : "application/json "
            },
            body: JSON.stringify(newComment)
        }).then(() => getCommentsByPost(newComment.post_id))
            
    }

    const updateComment = (commentId, newComment) => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "PUT",
            headers : { 
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type" : "application/json "
            },
            body: JSON.stringify(newComment)
        })

    }

    const deleteComment = (com) =>  {
        fetch(`http://localhost:8000/comments/${com.id}`, {
            method : "DELETE",
            headers : {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            }
        }).then(() => getCommentsByPost(com.post_id))
            return
    }

    const getComment = (commentId) => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            headers : {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
            }
        })
            .then(res => res.json())
    }
 
    return (
        <CommentContext.Provider value={{
            comments, getCommentsByPost, createComment, deleteComment, getComment, updateComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}