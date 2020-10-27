import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState([]);
    
    const getTags = () => {
        return fetch(`http://localhost:8088/tags`)
        .then((res) => res.json())
        .then(setTags);
    };

    const getTagById = id => {
        return fetch(`http:localhost:8088/tags/${id}`)
        .then(r => r.json())
        .then(setTag)
    }
    const createTag = (newTag) => {
        return fetch(`http://localhost:8088/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTag),
        }).then(getTags);
    };

    const deleteTag = (c) => {
        return fetch(`http://localhost:8088/tags/${c.id}`, {
            method : "DELETE"
        }).then(getTags)
    }

    const updatedTag = (c) => {
        return fetch(`http://localhost:8088/tags/${c.id}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
        }).then(getTags)
    }

    return (
        <TagContext.Provider
            value={{
                tag,
                tags,
                setTag,
                getTags,
                createTag,
                getTagById,
                updatedTag,
                deleteTag
            }}
        >
            {props.children}
        </TagContext.Provider>
    );
};
