import React, {useContext, useState} from "react"

import {TagContext} from "./TagProvider"

export const TagForm = (props) => {
    const {createTag, tag, setTag} = useContext(TagContext)

    const handleChange = (e) => {
        const newTag = Object.assign({}, tag)
        newTag[e.target.name] = e.target.value
        setTag(newTag)    
    }

    const makeNewTag = () => {
        createTag({
            name : tag.name
        }).then(props.history.push("/tags"))
    }

    return (
        <form className="tagForm">
            <h2 className="tagForm__title">Tag form</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="name">Tag Name :</label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Science, Internet, Politits, etc"
                        value={tag.name}
                        onChange={handleChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()
                    makeNewTag()
                }}
                className="btn btn-form">
                Create Tag
            </button>
            <button className="btn btn-secondary" onClick={() => props.history.push('/tags')}>Cancel</button>
        </form>
    )
}