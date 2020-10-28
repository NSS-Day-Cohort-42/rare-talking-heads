import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider"
import "./Posts.css"

export const PostList = props => {
    const { posts, getAllPosts, getPostsByUser } = useContext(PostContext)

    const [view, setView] = useState('all')

    useEffect(() => {
        if (props.match) {
            if (props.match.path === '/posts/myposts') {
                const user_id = Number(localStorage.getItem("rare_user_id"));
                getPostsByUser(user_id);
                setView('myposts')
            }
        }
        else {
            getAllPosts()
        }
    }, [])

    

    return (
        <div>

            <article className = "post-list">
                <h1>{view === 'myposts' ? 'My ' : ''}Posts</h1>
                <button className="addPostBtn btn btn-primary"
                onClick={
                    () =>
                    props.history.push("/posts/create")}>Add New Post</button>

                {
                    posts.map(post => {
                        // this function checks to see if the current user has any posts that they wrote
                        const ableToEdit = () => {
                            if (parseInt(localStorage.getItem("rare_user_id")) === post.user_id) {
                                return true
                            } else {
                                return false
                            }
                        }
                        return <section className = "post-preview" key={post.id}>
                            <div className = "post-preview-header">
                                {post.user_name}
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
                                {post.category_name}
                            </div>
                        </section>
                    })
                }
            </article>

        </div>
    )
}