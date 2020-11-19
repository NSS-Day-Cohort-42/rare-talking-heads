import React, { useContext, useEffect, useState } from "react"
import Tag from "./Tag"
import { TagContext } from "./TagProvider"
import { ProfileContext } from "../auth/AuthProvider"
import "./Tags.css"

export default (props) => {
    const { tags, getTags, setTag, deleteTag } = useContext(TagContext)
    const { isAdmin } = useContext(ProfileContext)

    // State for the confirmation to delete a tag
    const [deleteWarning, setDeleteWarning] = useState(-1)

    // Upon page load getTags runs to get the tags from the provider
    useEffect(() => {
        getTags()
    }, [])

    return (
        <>
        <div className="tag-container">
            <h3 className="tag_heading">
                Tags
            </h3>
            
            <div className="tags">
                <table>
                    <tbody>
                        {tags.map((tag) => (
                            <>
                            <tr>
                                <td>
                                    {/* If the user id an admin they are able to edit and delete a tag */}
                                    {isAdmin 
                                        ? <div>
                                            <button className="btn btn-danger tagDeleteButton"
                                            onClick={() => {setDeleteWarning(tag.id)}}>
                                                <i className="fas fa-trash-alt fa-sm" id="delete-tag-button" size="sm"></i>
                                            </button>
                                            <button className="btn btn-dark tagEditBtn" onClick={
                                            () => {
                                                setTag(tag)
                                                props.history.push(`/tags/edit/${tag.id}`)
                                            }
                                            }><i className="fas fa-edit fa-sm" id="edit-tag-button" size="sm"/></button>
                                        </div>
                                        : ''}
                                </td>
                                <td>
                                    <Tag tag={tag} key={tag.id} />
                                </td>
                                
                            </tr>
                            <tr>
                                {/* The confirmation that appears after a user clicks the trash icon */}
                                { deleteWarning === tag.id
                                    ? <div className="alert alert-danger" role="alert">
                                        Are you sure you want to delete this tag?
                                        <button className = "btn btn-secondary" onClick={() => {deleteTag(tag.id).then(props.history.push('/tags'))}}>Yes, delete</button>
                                        <button className = "btn btn-secondary" onClick={() => {setDeleteWarning(false)}}>No, cancel</button>
                                    </div>
                                    : ''
                                    }
                            </tr>
                            </>
                        ))}
                    </tbody>
                </table>
                <div className="addTagBtn">
                <button className="btn btn-warning btn-sm" onClick={() => props.history.push("/tags/create")}>
                    Create Tag
                </button>
            </div>
            </div>
        </div>
        </>
    )
}