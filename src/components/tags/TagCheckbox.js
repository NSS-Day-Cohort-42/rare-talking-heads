import React, { useState, useEffect, useContext } from "react"
import {PostTagContext} from "../PostTags/PostTagProvider"

export const TagBoxes = (props) => {
    const [checked, setChecked] = useState(false)
    const { removePostTag, addPostTag, postTags, getPostTagsByPost } = useContext(PostTagContext)
    const tag = props.tag
    const selectedTags = props.selectedTags

    useEffect(() => {
        let postTag = postTags.find(pt => pt.tag_id === tag.id)
        if(postTag){
            setChecked(true)
        }
    }, [postTags])

    useEffect(() => {
        if (props.post.id) {
            getPostTagsByPost(props.post.id)
        }
    },[props.editMode, props.post.id])


    const checkboxHandler = () => {
        if (checked) {
            if(props.editMode){
                const foundPostTag = postTags.find(pt => pt.tag_id === tag.id && pt.post_id === props.post.id)
                removePostTag(foundPostTag.id)
            }else{
            let newArray = selectedTags.filter(t => tag.id !== t.id)
            props.setTags(newArray)
            }
        }else{
            if(props.editMode){
                const newPostTag = ({
                    tag_id: tag.id,
                    post_id:  props.post.id
                })
                addPostTag(newPostTag)
            }
            let newArray = selectedTags
            newArray.push(tag)
            props.setTags(newArray)
        }
        setChecked(!checked)
    }

    return (
        <div>
        {/* <div className="tag-container"> */}
            <label>
                <input type="checkbox" id="tag" checked={checked} onChange={checkboxHandler}></input>
                {tag.label}
            </label>
        </div>
    )
}