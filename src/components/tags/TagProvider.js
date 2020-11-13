import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState([]);
    
    const getTags = () => {
        return fetch(`http://localhost:8000/tags`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then((res) => res.json())
        .then(setTags);
    };

    const getTagById = id => {
        return fetch(`http:localhost:8000/tags/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(r => r.json())
        .then(setTag)
    }
    const createTag = (newTag) => {
        return fetch(`http://localhost:8000/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(newTag),
        }).then(getTags);
    };

    const deleteTag = (c) => {
        return fetch(`http://localhost:8000/tags/${c.id}`, {
            method : "DELETE",
            headers:  {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
        }).then(getTags)
    }

    const updateTag = (c) => {
        return fetch(`http://localhost:8000/tags/${c.id}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(c),
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
                updateTag,
                deleteTag
            }}
        >
            {props.children}
        </TagContext.Provider>
    );
};
