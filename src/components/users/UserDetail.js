import React, {useContext, useEffect, useState} from 'react'



import {UserContext} from "./UserProvider"

export const UserDetail = (props) => {
    const {getSingleUser} = useContext(UserContext)

    const [user, setUser] = useState({})

    const [userType, setUserType] = useState({})
    const [imgCheck, setImgType] = useState({})
    
    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getSingleUser(userId).then(setUser)
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
    )






}