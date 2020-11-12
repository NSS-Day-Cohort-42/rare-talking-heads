import React, {useContext, useEffect, useRef, useState} from "react"

import {CommentContext} from "./CommentProvider"

export const CommentForm = (props) => {
    const { createComment, updateComment, getComment } = useContext(CommentContext) 

    const [ comment, setComment ] = useState({subject: '', content: ''})

    const subject = useRef(null)
    const content = useRef(null)

    const editMode = props.match.params.hasOwnProperty("commentId") // true or false
    

    useEffect(() => {
        if (editMode) {
            const commentId = parseInt(props.match.params.commentId);
            
            getComment(commentId)
                .then(res => setComment(res))
        }
    }, [] )

    const inputHandler = (e) => {
        const newComment = {...comment}    // Create a copy
        newComment[e.target.name] = e.target.value     // Modify copy
        
        setComment(newComment)
    } 

    

    const saveComment = () => {
        if(editMode) {
        updateComment(parseInt(props.match.params.commentId), {
            subject : comment.subject,
            content : comment.content,
            post_id : comment.post_id,
            created_on : comment.created_on
        })
        .then(props.history.push(`/comments/post/${comment.post_id}`))

        } else {
        createComment({
            subject : comment.subject,
            content : comment.content,
            // user_id : parseInt(localStorage.getItem("rare_user_id")),
            post_id : parseInt(props.match.params.postId)
        }).then(props.history.push(`/comments/post/${props.match.params.postId}`))
        }

    }
        
    return (
        <form className="CommentForm">
            <h3 className="CommentForm__title">Add Comment</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Subject : </label>
                    <input type="text" ref={subject} name="subject" required autoFocus className="form-control" value={comment.subject} onChange={inputHandler}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Comment :</label>
                    <input type="text" ref={content} name="content" required autoFocus className="form-control" value={comment.content} onChange={inputHandler}
                    
                    />
                </div>
            </fieldset>
            
            {
                
                editMode ?
                <div className="buttons">
                <button type="submit" className="CommentSaveBtn btn btn-primary"
                    onClick={e => {
                        e.preventDefault()
                        saveComment()
                    }}>Update</button>
                <button className="btn btn-secondary" 
                    onClick={() => {
                        props.history.push(`/comments/post/${comment.post_id}`)}}>
                Cancel</button>
                </div>
                :
                <div className="buttons">
                <button type="submit" className="CommentSaveBtn btn btn-primary"
                    onClick={e => {
                        e.preventDefault()
                        saveComment()
                    }}>Save</button>
                <button className="btn btn-secondary" 
                    onClick={() => {
                        const postId = parseInt(props.match.params.postId)
                        props.history.push(`/comments/post/${postId}`)}}>
                Cancel</button>
                </div>

                 
            }
            
            
        </form>
    )

}
            
        
        
    
    

    


    

