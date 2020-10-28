import React, {useContext, useEffect, useRef} from "react"

import {CommentContext} from "./CommentProvider"

export const CommentForm = (props) => {
    const {createComment, getCommentsByPost, comments} = useContext(CommentContext) 

    

    
    useEffect(() => {
        const postId = props.match.params.postId
        
        getCommentsByPost(postId)
    }, [])

    const subject = useRef(null)
    const content = useRef(null)
    

    const makeNewComment = () => {
        createComment({
            subject : subject.current.value,
            content : content.current.value,
            user_id : parseInt(localStorage.getItem("rare_user_id")),
            post_id : parseInt(props.match.params.postId)
        }).then(props.history.push(`/posts/${props.match.params.postId}`))
    }
        
    return (
        <form className="CommentForm">
            <h3 className="CommentForm__title">Add Comment</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Subject : </label>
                    <input type="text" ref={subject} required autoFocus className="form-control"
                        
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Comment :</label>
                    <input type="text" ref={content} required autoFocus className="form-control"
                    
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    makeNewComment()
                }}
            className="CommentSaveBtn">
                Save Comment
            </button>
            
        </form>
    )

}
            
        
        
    
    

    


    

