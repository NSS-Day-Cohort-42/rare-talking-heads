import React, {useContext, useEffect, useState} from "react"

import {CommentContext} from "./CommentProvider"

export const CommentForm = (props) => {
    const {createComment, comment, setComment} = useContext(CommentContext)


    const [editMode, editModeChanged] = useState(false)

    const toEdit = props.match.params.hasOwnProperty("commentId")

    useEffect(() => {
        if(toEdit) {
            editModeChanged(true)
        } else {
            editModeChanged(false)
        }
    }, [comment])

    const handleChange = e => {
        const newComment = Object.assign({}, comment)
        newComment[e.target.name] = e.target.value
        setComment(newComment)
    }

    const makeNewComment = () => {
        if(editMode) {
            console.log("Adding function next")
        
    } else {
        createComment({
            
        })
    }

}