import React, {useState} from "react"

export const ReactionContext = React.createContext()


export const ReactionProvider = props => {
    const [reactionTypes, setReactionTypes] = useState([])
    const [postReactions, setPostReactions] = useState([])

    const reactionCounter = (postReactions) => {
        const reactionCount = {}
        postReactions.forEach((r) => {
            if (!reactionCount[r.reaction_id]) {
                reactionCount[r.reaction_id] = 0
            }
            reactionCount[r.reaction_id] += 1
        })
        setPostReactions(reactionCount)
    }
    
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

    const getReactionTypes = () => {
        return fetch('http://localhost:8000/reactions', {
            method: "GET",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(r => r.json())
        .then(setReactionTypes)
    };

    const getPostReactionsByPostId = (postId) => {
        return fetch(`http://localhost:8000/postreactions?post_id=${postId}`, {
            method: "GET",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(r => r.json())
        // .then(setPostReactions)
        .then(r => reactionCounter(r))
    };

    return (
        <ReactionContext.Provider value={{
            addDeleteReaction, reactionTypes, getReactionTypes, postReactions, getPostReactionsByPostId
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}