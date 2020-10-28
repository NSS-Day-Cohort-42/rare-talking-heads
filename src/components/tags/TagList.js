import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import { TagContext } from "./TagProvider";

import "./Tags.css"

export default (props) => {
    const { tags, getTags } = useContext(TagContext);

    useEffect(() => {
        getTags();
    }, []);

    return (
        <>
        <div className="tag-container">
            <h3 className="tag_heading">
                Tags
            </h3>
            <div className="addTagBtn">
                <button className="btn btn-primary" onClick={() => props.history.push("/tags/create")}>
                    Create Tag
                </button>
            </div>
            <div className="tags">
                {tags.map((c) => (
                    <Tag tag={c} key={c.id} />
                ))}
            </div>
        </div>
        </>
    );
};