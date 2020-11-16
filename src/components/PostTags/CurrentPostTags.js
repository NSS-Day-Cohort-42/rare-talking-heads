import React from "react"

export const CurrentPostTags = ({singlePostTag}) => {

    return (
        <div className="current-post-tag">
            <h6>{singlePostTag.tag.label}</h6>
        </div>
    )
}