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
                <button className="addPostBtn"
                onClick={
                    () =>
                    props.history.push("/posts/create")}>Add New Post</button>

                {
                    posts.map(post => {
                        return <section className = "post-preview" key={post.id}>
                            <div className = "post-preview-header">
                                {post.user_name}
                                <span className="edit-button">
                                    {/* temporary space for edit button */}
                                    edit
                                </span>
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