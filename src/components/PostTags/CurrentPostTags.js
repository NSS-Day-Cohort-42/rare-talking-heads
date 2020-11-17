import React from "react"

export const CurrentPostTags = ({singlePostTag}) => {

    return (
        <div className="current-post-tag post-tags">
            <div>{singlePostTag.tag.label}</div>
        </div>
    )
}