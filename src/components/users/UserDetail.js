import React, {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'



import {UserContext} from "./UserProvider"
import {PostContext} from "../posts/PostProvider"
import {ProfileContext} from "../auth/AuthProvider"

export const UserDetail = (props) => {
    const {getSingleUser} = useContext(UserContext)
    const {myposts, getPostsByUser} = useContext(PostContext)

    const {isAdmin, profile} = useContext(ProfileContext)
    
    

    const [user, setUser] = useState({})

    const [userType, setUserType] = useState({})
    const [imgCheck, setImgType] = useState({})
    
    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getSingleUser(userId).then(setUser)
        
        
    }, [])

    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        
        getPostsByUser(userId)
    }, [])

    

    
    useEffect(() => {
        const staffCheck = user.user && user.user.is_staff.toString() === "true"
        setUserType(staffCheck)
    }, [user])

    useEffect(() => {
        const userImg = user.profile_image_url !== ""
        setImgType(userImg)
    }, [user])

    
    

    return (
        <div>
        <article className="user container">
            <div className="row">
            { imgCheck ?
            <img className="col-5" src={user.profile_image_url} />
            :
            <div><i className="fas fa-user fa-10x"></i></div>
            }
            <div className="col">
            <div className="user_username">Username: {user.user && user.user.username}</div>
            <div className="user__email">Email: {user.user && user.user.email}</div>
            <div className="user__created-on">Created: <span></span>
            {
                new Date(user.created_on).toLocaleDateString("en-US",
                {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            }
            </div>
            
            <div className="user__type"> Account Type: <span></span>
            {
                userType ? "Admin" : "User"
            }
            </div>
            </div>
            </div>
            <div className="row">
                
            <div className="user__name col-5">Name: {user.user && user.user.first_name} {user.user && user.user.last_name}</div>
            </div>
        </article>
        
        {
        
            myposts.map(post => {
            const ableToEdit = () => {
                if (isAdmin || post.author_id === profile.id) {
                    return true
                } else {
                    return false
                }
            }
                if (post.approved === true || isAdmin)
                    return <section className = "post-preview" key={post.id}>
                        <div className = "post-preview-header">
                            By: {post.author.user.first_name} {post.author.user.last_name}
                            {ableToEdit() ? (<span className="edit-button"> {/* If user id matches the post.user_id they will be able to edit post */}
                                <i className="fas fa-edit"
                                style={{cursor:'pointer'}}
                                onClick={() => {props.history.push(`/posts/edit/${post.id}`)}}>Edit</i>
                            </span>) : <span className="edit-button"> </span>}
                            
                        </div>
                        <div className="post-preview-title">
                            <Link to={`/posts/${post.id}`}>
                                <h3>{post.title}</h3>
                            </Link>
                        </div>
                        <div className = "post-preview-footer">
                            Category: {post.category.label}
                        </div>
                    </section>
    
            })
        
        }
            
            
        </div>
    )






}

