import React, {useContext, useEffect, useState} from 'react'

import {Link} from "react-router-dom"

import {UserContext} from "./UserProvider"

export const UserList = props => {
    const {users, getAllUsers} = useContext(UserContext)


    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <>
        <article className="users-list">
            {
                users.map(u => {
                    const userType = () => {
                        if(u.user && u.user.is_staff === 1) {
                            return true
                        } else {
                            return false
                        }       
                    }
                    return <section class="user" key={u.id}>
                        <div className="user__name">{u.user && u.user.first_name} {u.user && u.user.last_name}</div>
                        
                        <div className="user__name">{u.user && u.user.username}</div>
                        <div className="user__name">{userType ? "User" : "Admin"}</div>
                    </section>
                })
            }

        </article>
        </>
    )


}