import React, { useContext, useEffect, useState } from 'react';
import { CommentContext } from '../comments/CommentProvider';
import { PostContext } from "./PostProvider"
import "./Posts.css"

export const PostDetail = (props) => {
    const { getSinglePost, parsePostContent } = useContext(PostContext);
    const {comments, getCommentsByPost} = useContext(CommentContext)

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

    useEffect(() => {
        const postId = parseInt(props.match.params.postId);
        getSinglePost(postId)
            .then(setPost)
    }, []);

    useEffect(() => {
        const postId = parseInt(props.match.params.postId)
        getCommentsByPost(postId)
    }, [])

    return (
        <div className="post">
            <img className="post-img-header" src={post.header_img} alt="" />
            <h1 className = "post-title">
                {post.title}
            </h1>
            <div className="post-info">
                <div className="post-info-l">
                    <div>
                        <span className="post-author">
                            {post.user_name}
                        </span>
                        <span className="post-date">
                            {post.pubdate}
                        </span>
                    </div>
                    <div>
                        <span className="post-category">
                            {post.category_name}
                        </span>
                        <span className="post-tags">
                            {/* tags will go here */}
                        </span>
                    </div>
                </div>
                <div className="post-info-r">
                    <div className="post-edit-buttons">
                        {/* edit and delete buttons will go here */}
                    </div>
                    <div className="post-manage-tags">
                        {/* manage tags button will go here */}
                    </div>
                </div>
            </div>
            <div className="post-content">
                {parsePostContent(post.content).map(paragraph => <p>{paragraph}</p>)}
            </div>
            <div>
                <article className="comments">
                    <h3>Cesspool of Comments</h3>
                    <div className="addCommentbtn">
                        <button onClick={
                            () => props.history.push("/comments/create")
                        }>Add Comment</button>
                    </div>
                {
                    comments.map(com => {
                        return <section className="comment" key={com.id}>
                            <div className="comment__subject">Subject: {com.subject}</div>
                            <div className="comment__content">Comment: {com.content}</div>
                            <div className="comment__userName">User: {com.user.user_name}</div>

                        </section>
                    })
                }
                </article>
            </div>
        </div>


    )
};
