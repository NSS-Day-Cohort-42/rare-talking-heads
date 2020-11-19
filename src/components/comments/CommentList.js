import React, { useContext, useEffect, useState } from 'react';
import { CommentContext } from '../comments/CommentProvider';
import { ProfileContext } from '../auth/AuthProvider'
import "../comments/Comment.css"
import { PostContext } from '../posts/PostProvider';


export const CommentList = (props) => {
    const {getCommentsByPost, deleteComment, comments} = useContext(CommentContext)
    const {getSinglePost} = useContext(PostContext)
    const { isAdmin } = useContext(ProfileContext)
    const [singlePost, setSinglePost] = useState({})

    

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getSinglePost(postId).then(setSinglePost)
    }, [])


    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getCommentsByPost(postId)
        
    },[])

    


    return (

        <article className="comments">
            <h3 className="post__title">Post Title: {singlePost.title}</h3>
            <h3>Cesspool of Comments</h3>
                <div className="comment__headerbtn">
                <div className="addCommentbtn">
                    <button className="btn btn-primary" onClick={
                    
                    () => props.history.push(`/comments/create/${props.match.params.postId}`)
                    }>Add Comment</button>
                </div>
                <div className="backToPostDetail">
                    <button className="btn btn-secondary" onClick={
                    
                    () => props.history.push(`/posts/${props.match.params.postId}`)
                    }>Back To Post</button>
                </div>
                </div>
            
                {
                    comments.map(com => {
                        if(com.is_owner === true || isAdmin) {
                            return <section className="comment card w-50 border-primary" key={com.id}>
                                
                                <div className="comment__subject card-header">{com.subject}</div>
                                <div className="card-body">
                                <div className="comment__content card-text">{com.content}</div>
                                </div>
                                <div className="card-footer">
                                <div className="comment__userName card-text"><small className="text-muted">{com.commenter && com.commenter.user.username}</small></div>
                                <img className="avatar avatar-xs rounded-circle float-right" src={com.commenter.profile_image_url} alt="" />
                                <button className = "mr-2 btn btn-primary" onClick={
                                    () => props.history.push(`/comments/edit/${com.id}`)
                                }>Edit</button>
                                
                                <button className="mr-2 btn btn-danger" onClick={
                                    () => {
                                        const postId = parseInt(props.match.params.postId)
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
                            <img className="avatar avatar-xs rounded-circle float-right" src={com.commenter.profile_image_url} />
                            </div>
                            
                            </section>
                        }
                    })
                }
                
                </article>
        
    )}