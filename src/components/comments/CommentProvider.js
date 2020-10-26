import React, {useState} from "react"

export const CommentContext = React.createContext()

export const CommentProvider = props => {
    const [comments, setComments] = useState([])

    const getCommentsByPost = (post_id) => {
        return fetch(`http://localhost:8088/comments?post_id=${post_id}`)
        .then(r => r.json())
        .then(setComments)
    }

    return (
        <CommentContext.Provider value={{
            comments, getCommentsByPost
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}