import React, {useContext, useEffect, useState} from 'react'

import {Link} from "react-router-dom"

import {UserContext} from "./UserProvider"
import {ProfileContext} from "../auth/AuthProvider"

export const UserList = props => {
    const {users, getAllUsers, changeUserType} = useContext(UserContext)

    const {isAdmin} = useContext(ProfileContext)

    
    

    useEffect(() => {
        getAllUsers()
        
    }, [])

    const approvalHandler = (e) => {
        const index = e.target.dataset.index
        
        console.log(index)
        const user = users[index]
        console.log(user.id)
        console.log(user.user.is_staff)
        
        changeUserType(user.id, !user.user.is_staff)

    }


    return (
        <>
        <article className="users-list">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        <th scope="col">User Type</th>
                        {isAdmin ? <th scope="col">Active</th> : ''}
                        {isAdmin ? <th scope="col">Set User Type</th>: ''}

                        
                    </tr>
                </thead>
                <tbody>
            {
                users.map((u, index) => {
                    const userType = u.user && u.user.is_staff.toString() === "true"                      
                    return <tr className="user" key={u.id}>
                        
                        <td><Link to= {`/users/${u.id}`}>{u.user && u.user.username}</Link></td>
                        
                        
                        <td>{u.user && u.user.first_name} {u.user && u.user.last_name}</td>
                        
                        
                        <td>{userType ? "Admin" : "User"}</td>
                        
                        {isAdmin ?
                            <td><button className="btn btn-danger">Active Placeholder</button></td>
                        :
                        ''
                        }
                        
                        {isAdmin ? 
                            <td><div className="form-check">
                            <input class="form-check-input" type="checkbox" checked={u.user.is_staff} id={u.id} data-index={index} onChange={approvalHandler}/>
                            <label class="form-check-label" for="defaultCheck1">
                                Admin
                            </label>
                            </div>
                            <div className="form-check">
                            <input class="form-check-input" type="checkbox" checked={!u.user.is_staff} id={u.id} data-index={index} onChange={approvalHandler}/>
                            <label class="form-check-label" for="defaultCheck1">
                                User
                            </label>
                            </div>
                        </td>    
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



{/* <td><button className="btn btn-primary">Placeholder Admin</button>
<button className="btn btn-secondary">Placeholder User</button></td> */}