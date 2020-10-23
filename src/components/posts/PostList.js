import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import "./Posts.css"

export const PostList = props => {
    const { posts, getAllPosts } = useContext(PostContext)

    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <div>
            <h1>Posts</h1>

            <article className = "post-list">
                {
                    posts.map(post => {
                        return <section className = "post-preview" key={post.id}>
                            <div className = "post-preview-header">
                                {post.user_name}
                            </div>
                            <div className="post-preview-title">
                                <h3>{post.title}</h3>
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