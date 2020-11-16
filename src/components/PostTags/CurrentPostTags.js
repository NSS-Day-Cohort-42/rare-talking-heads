import React from "react"

export const CurrentPostTags = ({singlePostTag}) => {

    return (
        <div className="current-post-tag">
            <h4>#{singlePostTag.tag.label}</h4>
        </div>
    )
}