import React, {useContext, useEffect} from "react"
import { PostContext } from "../posts/PostProvider"



export const CategoryViewPosts = props => {

    const {posts, getPostsByCat} = useContext(PostContext)

    useEffect(() => {
        const catId = props.match.params.categoryId
        
        getPostsByCat(catId)
    }, [])

    return (
        <div>

            <article className = "post-list">
                

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