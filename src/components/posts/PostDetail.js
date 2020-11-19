import React, { useContext, useEffect, useState } from 'react';
// import { CommentContext } from '../comments/CommentProvider';
import { PostContext } from "./PostProvider"
import "./Posts.css"
import "../comments/Comment.css"
import { PostTags } from "../PostTags/PostTags"
import { ProfileContext } from "../auth/AuthProvider"
import {ReactionContext} from "../reactions/ReactionProvider"

export const PostDetail = (props) => {
    const { getSinglePost, parsePostContent, deletePost} = useContext(PostContext);
    // const {getCommentsByPost, deleteComment, comments, setComments} = useContext(CommentContext)
    const {addDeleteReaction, getReactionTypes, reactionTypes, postReactions, getPostReactionsByPostId} = useContext(ReactionContext)

    const { isAdmin } = useContext(ProfileContext)

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

    useEffect(() => {
        const postId = parseInt(props.match.params.postId);
        
        getSinglePost(postId)
            .then(setPost)
        getReactionTypes()
        getPostReactionsByPostId(postId)
    }, []);

    useEffect(() => {
        if (post.is_owner === true) {
            setEditMode(true);
        }
    }, [post.id])

    return (
        <div className="post">
            <h1 className = "post-title">
                {post.title}
            </h1>
            <img className="post-img-header" src={post.image_url} alt="" />
            <div className="post-inner">
            <div className="viewCommentBtn text-center">
                        <button className="btn btn-sm btn-warning " onClick={
                            () => props.history.push(`/comments/post/${props.match.params.postId}`)
                        }>View Comments</button>
                    </div>
            <div className="reactions">
                {
                    reactionTypes.map(reaction => { return (
                    <>
                        <img src={reaction.image_url} className="reaction-button ml-2" alt="" onClick={() => {
                            addDeleteReaction(parseInt(props.match.params.postId), reaction.id)
                            .then(() => {getPostReactionsByPostId(parseInt(props.match.params.postId))})
                        }} />
                        {postReactions[reaction.id]}
                    </>
                    )})
                }
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
                            {`Category:  ${post.category && post.category.label}`}
                        </span>
                    </div>
                </div>
                <div className="post-info-r">
                    <div className="post-edit-buttons">
                        {editMode || isAdmin
                            ? <i className="fas fa-trash-alt" id="delete-post-button" onClick={() => {setDeleteWarning(true)}}></i> 
                            : ''}
                    </div>
                    <div className="postTagContainer post-manage-tags">
                        <PostTags postId={post.id} postOwner={editMode} />
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
            </div>
            
            
        </div>
    )
}
