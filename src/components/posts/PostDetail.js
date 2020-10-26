import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from "./PostProvider"
import "./Posts.css"

export const PostDetail = (props) => {
    const { getSinglePost } = useContext(PostContext);

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

    return (
        <h1>
            {post.title}
        </h1>
    )
};
