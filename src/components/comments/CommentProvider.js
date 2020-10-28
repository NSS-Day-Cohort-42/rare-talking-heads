import React, {useState} from "react"

export const CommentContext = React.createContext()

export const CommentProvider = props => {
    const [comments, setComments] = useState([])

    const getCommentsByPost = (post_id) => {
        return fetch(`http://localhost:8088/comments?post_id=${post_id}`)
        .then(r => r.json())
        .then(setComments)
    }

    const createComment = (newComment) => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers : { "Content-Type" : "application/json "
            },
            body: JSON.stringify(newComment)
        }).then(() => getCommentsByPost(newComment.post_id))
            
    }

    const deleteComment = (com) =>  {
        fetch(`http://localhost:8088/comments/${com.id}`, {
            method : "DELETE"
        }).then(() => getCommentsByPost(com.post_id))
            return
    }
 
    return (
        <CommentContext.Provider value={{
            comments, getCommentsByPost, createComment, deleteComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}