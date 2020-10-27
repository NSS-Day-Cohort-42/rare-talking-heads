import React, {useContext, useEffect, useState} from "react"

import {CommentContext} from "./CommentProvider"

export const CommentForm = (props) => {
    const {createComment, getCommentsByPost} = useContext(CommentContext) 

    const [editMode, editModeChanged] = useState(false)

    const [comment, setComment] = useState({})

    const toEdit = props.match.params.postId
    
    useEffect(() => {
        const toTest = props.match.params.postId
        console.log(toTest)

    })

    useEffect(() => {
        if(toEdit) {
            console.log(toEdit)
            editModeChanged(true)
        } else {
            console.log(toEdit)
            editModeChanged(false)
        }
    }, [comment])

    useEffect(() => {
        const postId = props.match.params.postId
        console.log(postId)
        getCommentsByPost(postId)
    }, [])

    const handleChange = e => {
        const newComment = Object.assign({}, comment)
        newComment[e.target.name] = e.target.value
        setComment(newComment)
    }

    // const getCommentsInEditMode = () => {
    //     if(editMode) {
    //         const postId = parseInt(props.match.params.postId)
    //         const selectedComment = comment.find(c => c.id === )
    //     }
    // }

    const makeNewComment = () => {
        if(editMode) {
            console.log("Adding function next")
        
        } else {
        createComment({
            subject : comment.subject,
            content : comment.content,
            user_id : parseInt(localStorage.getItem("rare_user_id")),
            post_id : 1
        }).then(props.history.push(`/posts/${props.match.params.postId}`))
    }}

    return (
        <form className="CommentForm">
            <h3 className="CommentForm__title">{editMode ? "Update Comment" : "Create Comment"}</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Subject : </label>
                    <input type="text" name="subject" required autoFocus className="form-control"
                        //defaultValue={comment.subject}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Comment :</label>
                    <input type="text" name="content" required autoFocus className="form-control"
                    //defaultValue={comment.subject}
                    onChange={handleChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    makeNewComment()
                }}
            className="CommentSaveBtn">
                {editMode ? "Edit Comment" : "Save Comment"}
            </button>
            
        </form>
    )

}