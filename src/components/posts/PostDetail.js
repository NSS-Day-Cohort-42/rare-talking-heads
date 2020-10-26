import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from "./PostProvider"
import "./Posts.css"

export const PostDetail = (props) => {
    const { getSinglePost, parsePostContent } = useContext(PostContext);

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

    // const currentUser = localStorage.getItem("rare_user_id") === post.id;

    useEffect(() => {
        const postId = parseInt(props.match.params.postId);
        getSinglePost(postId)
            .then(setPost)
    }, []);

    useEffect(() => {
        if (Number(localStorage.getItem("rare_user_id")) === post.id) {
            setEditMode(true);
        }
    }, [post.id])

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
                        {editMode ? 'DELETE' : ''}
                    </div>
                    <div className="post-manage-tags">
                        {/* manage tags button will go here */}
                    </div>
                </div>
            </div>
            <div className="post-content">
                {parsePostContent(post.content).map(paragraph => <p>{paragraph}</p>)}
            </div>
        </div>


    )
};
