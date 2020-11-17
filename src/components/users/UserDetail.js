import React, {useContext, useEffect, useState} from 'react'

import {UserContext} from "./UserProvider"

export const UserDetail = (props) => {
    const {getSingleUser} = useContext(UserContext)

    const [user, setUser] = useState({})
    
    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getSingleUser(userId).then(setUser)
    }, [])

    return (
        <article className="user">
            <div className="user_username">{user.user && user.user.username}</div>
        </article>
    )






}