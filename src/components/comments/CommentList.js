import React, { useContext, useEffect, useState } from 'react';
import { CommentContext } from '../comments/CommentProvider';

import "../comments/Comment.css"


export const CommentList = (props) => {
    const {getCommentsByPost, deleteComment, comments} = useContext(CommentContext)


    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getCommentsByPost(postId)
        
    },[])


    return (
        <article className="comments">
            <h3>Cesspool of Comments</h3>
                <div className="addCommentbtn">
                    <button className="btn btn-primary" onClick={
                    
                    () => props.history.push(`/comments/create/${props.match.params.postId}`)
                    }>Add Comment</button>
                </div>
            
                {
                    comments.map(com => {
                        if(parseInt(localStorage.getItem("rare_user_id")) === com.user_id) {
                            return <section className="comment card w-50 border-primary" key={com.id}>
                                
                                <div className="comment__subject card-header">{com.subject}</div>
                                <div className="card-body">
                                <div className="comment__content card-text">{com.content}</div>
                                </div>
                                <div className="card-footer">
                                <div className="comment__userName card-text"><small className="text-muted">{com.commenter && com.commenter.user.username}</small></div>
                                <div className="comment_profile_img">{com.commenter.profile_image_url}</div>
                                <button className = "mr-2 btn btn-primary" onClick={
                                    () => props.history.push(`/comments/edit/${com.id}`)
                                }>Edit</button>
                                
                                <button className="mr-2 btn btn-danger" onClick={
                                    () => {
                                        const postId = parseInt(props.match.params.postId)
                                        console.log(postId)
                                        deleteComment(com)
                                    }
                                }>Delete</button>
                                </div>
                        </section>
                        } else {
                            return <section className="comment card w-50 border-secondary" key={com.id}>
                            <div className="comment__subject card-header">Subject: {com.subject}</div>
                            <div className="card-body">
                            <div className="comment__content">Comment: {com.content}</div>
                            </div>
                            <div className="card-footer">
                            <div className="comment__userName card-text"><small className="text-muted">User: {com.commenter && com.commenter.user.username}</small></div>
                            {/* <div className="comment_profile_img"><small><img src={com.commenter.profile_image_url} /></small></div> */}
                            </div>
                            <button className="mr-2 btn btn-danger" onClick={
                                    () => {
                                        
                                        
                                        deleteComment(com)
                                    }
                                }>Delete</button>
                                <button className = "mr-2 btn btn-primary" onClick={
                                    () => props.history.push(`/comments/edit/${com.id}`)
                                }>Edit</button>
                            </section>
                        }
                    })
                }
                
                </article>
        
    )}