import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { ProfileContext } from "../auth/AuthProvider"
import { PostContext } from "./PostProvider"
import "./Posts.css"

export const PostList = props => {
    const { posts, getAllPosts, getPostsByUser, myposts, approvePost } = useContext(PostContext)
    const { isAdmin } = useContext(ProfileContext)


    const [view, setView] = useState('all')

    const [userPost, setUserPosts] = useState(true)

    useEffect(() => {
        if (props.match) {
            if (props.match.path === '/posts/myposts') {
                const owner = posts.find(p => p.is_owner === true)
                getPostsByUser(owner.author_id);
                setView('myposts')
                setUserPosts(false)
            }
        }
        else {
            getAllPosts()
        }
    }, []) 

    const approvalHandler = (e) => {
        const index = e.target.dataset.index;
        const post = posts[index]
        // post.approved = !posts[index].approved
        approvePost(post.id, !post.approved)
    };

    return (
        <div>

            <article className = "post-list">
                <h1>{view === 'myposts' ? 'My ' : ''}Posts</h1>
                <button className="addPostBtn btn btn-primary"
                onClick={
                    () =>
                    props.history.push("/posts/create")}>Add New Post</button>

                {userPost ?
                    posts.map((post, index) => {
                        // this function checks to see if the current user has any posts that they wrote
                        const ableToEdit = () => {
                            if (post.is_owner === true) {
                                return true
                            } else {
                                return false
                            }
                        }

                        if (post.approved || isAdmin) {
                            return (
                                <section className = "post-preview" key={post.id}>
                                    <div className = "post-preview-header">
                                        By: {post.author.user.first_name} {post.author.user.last_name}
                                        {ableToEdit() ? (<span className="edit-button"> {/* If user id matches the post.user_id they will be able to edit post */}
                                            <i className="fas fa-edit"
                                            style={{cursor:'pointer'}}
                                            onClick={() => {props.history.push(`/posts/edit/${post.id}`)}}>Edit</i>
                                        </span>) : <span className="edit-button"> </span>}
                                        
                                    </div>
                                    <div className="post-preview-title">
                                        <Link to={`/posts/${post.id}`}>
                                            <h3>{post.title}</h3>
                                        </Link>
                                    </div>
                                    <div className = "post-preview-footer d-flex justify-content-between">
                                        <div>
                                            { isAdmin
                                                ?   <div className="form-check">
                                                        <input class="form-check-input" type="checkbox" checked={post.approved} id={post.id} data-index={index} onChange={approvalHandler}/>
                                                        <label class="form-check-label" for="defaultCheck1">
                                                            Approved
                                                        </label>
                                                    
                                                    </div>
                                                : ''
                                            }
                                        </div>
                                        <div>
                                            Category: {post.category.label}
                                        </div>
                                    </div>
                                </section>
                                
                            )
                        }
                        
                    })
                    : myposts.map(post => {
                        // this function checks to see if the current user has any posts that they wrote
                        const ableToEdit = () => {
                            if (post.is_owner === true) {
                                return true
                            } else {
                                return false
                            }
                        }
                        return <section className = "post-preview" key={post.id}>
                            <div className = "post-preview-header">
                                By: {post.author.user.first_name} {post.author.user.last_name}
                                {ableToEdit() ? (<span className="edit-button"> {/* If user id matches the post.user_id they will be able to edit post */}
                                    <i className="fas fa-edit"
                                    style={{cursor:'pointer'}}
                                    onClick={() => {props.history.push(`/posts/edit/${post.id}`)}}>Edit</i>
                                </span>) : <span className="edit-button"> </span>}
                                
                            </div>
                            <div className="post-preview-title">
                                <Link to={`/posts/${post.id}`}>
                                    <h3>{post.title}</h3>
                                </Link>
                            </div>
                            <div className = "post-preview-footer">
                                Category: {post.category.label}
                            </div>
                        </section>
                    })
                }
            </article>

        </div>
    )
}