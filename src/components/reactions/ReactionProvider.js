import React, {useState} from "react"

export const ReactionContext = React.createContext()

export const ReactionProvider = props => {
    const addDeleteReaction = (postId, reactionId) => {
        return fetch(`http://localhost:8000/posts/${postId}/react`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({reaction_id : reactionId})
        })
        
    }

    return (
        <ReactionContext.Provider value={{
            addDeleteReaction
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}