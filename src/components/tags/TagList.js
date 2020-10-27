import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import { TagContext } from "./TagProvider";

export default (props) => {
    const { tags, getTags } = useContext(TagContext);

    useEffect(() => {
        getTags();
    }, []);

    return (
        <>
            <h3>
                Tags
            </h3>
            <div className="addTagBtn">
                <button onClick={() => props.history.push("/tags/create")}>
                    Create Tag
                </button>
            </div>
            <div className="tags">
                {tags.map((c) => (
                    <Tag tag={c} key={c.id} />
                ))}
            </div>
        </>
    );
};