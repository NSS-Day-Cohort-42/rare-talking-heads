import React, { useContext, useState, useEffect } from "react"
import { PostTagContext } from "./PostTagProvider"
import { TagContext } from "../tags/TagProvider"
import { CurrentPostTags } from "./CurrentPostTags"
import { EditPostTags } from "./EditPostTags"

export const PostTags = ({postId, postOwner}) => {
    const { postTags, getPostTagsByPost } = useContext(PostTagContext)
    const { tags, getTags } = useContext(TagContext)
    const [isEditing, setIsEditing] = useState(false)
    const postTagIds = postTags.map(tag => tag.tag_id)

    useEffect(() => {
        if (postId > 0){
            getPostTagsByPost(postId)
        }

    }, [postId, tags]);

    useEffect(() => {
        getTags()
    },[])

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        isEditing ? getTags() : getPostTagsByPost(postId)
    }

    return (
        <div className="post-tags-container">
            <h4 className="post-tags-header">Tags</h4>
            {postOwner ? <button className="btn btn-primary" onClick={toggleEdit}>Manage tags</button>
            : ``}
            {isEditing ?
                    (
                    tags.map(tag => {
                    return <EditPostTags tag={tag} postTagIds={postTagIds} postId={postId} postTags={postTags} key={tag.id} />
                    })
                )
                :   (
                    postTags.map(singlePostTag => {
                    return <CurrentPostTags singlePostTag={singlePostTag} key={singlePostTag.id} />
                    })
                )
            }
        </div>
    )
} 