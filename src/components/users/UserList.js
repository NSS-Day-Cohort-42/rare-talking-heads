import React, {useContext, useEffect, useState} from 'react'

import {Link} from "react-router-dom"

import {UserContext} from "./UserProvider"
import {ProfileContext} from "../auth/AuthProvider"

export const UserList = props => {
    const {users, getAllUsers} = useContext(UserContext)

    const {isAdmin} = useContext(ProfileContext)

    
    


    useEffect(() => {
        getAllUsers()
    }, [])


    return (
        <>
        <article className="users-list">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        <th scope="col">User Type</th>
                        {isAdmin ? <th scope="col">Set User Type</th>: ''}
                        
                    </tr>
                </thead>
                <tbody>
            {
                users.map(u => {
                    const userType = u.user && u.user.is_staff.toString() === "true"                      
                    return <tr className="user" key={u.id}>
                        
                        <td><Link to= {`/users/${u.id}`}>{u.user && u.user.username}</Link></td>
                        
                        
                        <td>{u.user && u.user.first_name} {u.user && u.user.last_name}</td>
                        
                        
                        <td>{userType ? "Admin" : "User"}</td>
                        
                        
                        {isAdmin ? 
                            <td><button className="btn btn-primary">Placeholder Admin</button>
                            <button className="btn btn-secondary">Placeholder User</button></td>
                            
                        :
                        ''
                        }
                        
                    
                        </tr>
                })
            }
            </tbody>
            </table>
        </article>
        </>
    )


}