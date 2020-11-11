import React, { useContext, useEffect, useState } from 'react';
import { CommentContext } from '../comments/CommentProvider';
import { PostContext } from "./PostProvider"
import "./Posts.css"
import "../comments/Comment.css"

export const PostDetail = (props) => {
    const { getSinglePost, parsePostContent, deletePost} = useContext(PostContext);
    const {getCommentsByPost, deleteComment, comments, setComments} = useContext(CommentContext)
    
   
    // const postId = useParams();

    const [post, setPost] = useState({
        id: 0,
        title: '',
        content: '',
        pubdate: '',
        header_img: '',
        user_name: '',
        user_id: 0,
        category_name: '',
        category_id: 0,
    });

    
    const [editMode, setEditMode] = useState(false);

    const [deleteWarning, setDeleteWarning] = useState(false);

    // const currentUser = localStorage.getItem("rare_user_id") === post.id;
    
    useEffect(() => {
        const postId = parseInt(props.match.params.postId);
        
        getSinglePost(postId)
            .then(setPost)
    }, []);

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getCommentsByPost(postId)
        
    },[])

    useEffect(() => {
        if (Number(localStorage.getItem("rare_user_id")) === post.user_id) {
            setEditMode(true);
        }
    }, [post.id])
   
    return (
        <div className="post">
            <h1 className = "post-title">
                {post.title}
            </h1>
            <img className="post-img-header" src={post.image_url} alt="" />
            <div className="viewCommentBtn text-center">
                        <button className="btn btn-primary " onClick={
                            
                            () => props.history.push(`/comments/create/${props.match.params.postId}`)
                        }>View Comments</button>
                    </div>
            <div className="post-info">
                <div className="post-info-l">
                    <div>
                        <span className="post-author">
                            By: {post.author && post.author.user.username}
                        </span>
                        <span className="post-date">
                            {post.publication_date}
                        </span>
                    </div>
                    <div>
                        <span className="post-category">
                            {post.category && post.category.label}
                        </span>
                        <span className="post-tags">
                            {/* tags will go here */}
                        </span>
                    </div>
                </div>
                <div className="post-info-r">
                    <div className="post-edit-buttons">
                        {editMode 
                            ? <i className="fas fa-trash-alt" id="delete-post-button" onClick={() => {setDeleteWarning(true)}}></i> 
                            : ''}
                    </div>
                    <div className="post-manage-tags">
                        {/* manage tags button will go here */}
                    </div>
                </div>
            </div>

            { deleteWarning
            ? <div className="alert alert-danger" role="alert">
                Are you sure you want to delete this post?
                <button className = "btn btn-secondary" onClick={() => {deletePost(post.id).then(props.history.push('/'))}}>Yes, delete</button>
                <button className = "btn btn-secondary" onClick={() => {setDeleteWarning(false)}}>No, cancel</button>
            </div>
            : ''
            }
            <div className="post-content">
                {parsePostContent(post.content).map(paragraph => <p>{paragraph}</p>)}
            </div>
            
            
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
                                <div className="comment__userName card-text"><small className="text-muted">{com.user.user_name}</small></div>
                                
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
                            <div className="comment__subject card-header">{com.subject}</div>
                            <div className="card-body">
                            <div className="comment__content">{com.content}</div>
                            </div>
                            <div className="card-footer">
                            <div className="comment__userName card-text"><small className="text-muted">{com.user.user_name}</small></div>
                            </div>
                            </section>
                        }
                    })
                }
                
                </article>
            </div>
        


    )
};
