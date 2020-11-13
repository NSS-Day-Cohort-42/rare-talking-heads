import React, { useContext, useEffect } from "react";

import Tag from "./Tag";
import { TagContext } from "./TagProvider";
import { ProfileContext } from "../auth/AuthProvider"


import "./Tags.css"

export default (props) => {
    const { tags, getTags, setTag } = useContext(TagContext);
    const { isAdmin } = useContext(ProfileContext);

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
                <table>
                    <tbody>
                        {tags.map((tag) => (
                            <tr>
                                <td>
                                    {isAdmin 
                                        ? <button className="btn categoryEditBtn" onClick={
                                            () => {
                                            setTag(tag)
                                            props.history.push(`/tags/edit/${tag.id}`)
                                            }
                                            }><i className="fas fa-edit fa-sm" id="edit-category-button" size="sm"/></button>
                                        : ''}
                                </td>
                                <td>
                                    <Tag tag={tag} key={tag.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};