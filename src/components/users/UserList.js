import React, {useContext, useEffect, useState} from 'react'

import {Link} from "react-router-dom"

import {UserContext} from "./UserProvider"
import {ProfileContext} from "../auth/AuthProvider"
import "./users.css"

export const UserList = props => {
    const {users, getAllUsers, changeUserType, changeUserActiveStatus} = useContext(UserContext)

    const { isAdmin } = useContext(ProfileContext)

    // State for the confirmation to delete a tag
    const [ deleteWarning, setDeleteWarning ] = useState(-1)


    useEffect(() => {
        getAllUsers()
        
    }, [])

    const approvalHandler = (e) => {
        const index = e.target.dataset.index
        const user = users[index]
        const adminCount = []
        
        users.map(u => {
            if (u.user.is_staff === true)
                adminCount.push("1")
                
            })
        console.log(adminCount)

        if (adminCount.length === 1 && user.user.is_staff)
            alert("Sorry that's the last admin!  Please grant someone else admin access first")
        else changeUserType(user.id, !user.user.is_staff)

    }

    return (
        <>
        <article className="users-list">
            <table className="table table-borderless">
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
                            <td>
                                {
                                u.user.is_active // true or false -- if true, display red button that says deactivat, if false green reactivate button
                                    ? <button className="btn btn-danger"
                                    onClick={e => {
                                        setDeleteWarning(u.id) // will display a confirmation message to make sure the user should be deactivated
                                    }}>Deactivate User</button>
                                    : <button className="btn btn-success"
                                    onClick={e => {
                                        e.preventDefault(
                                        changeUserActiveStatus(u.id, !u.user.is_active) // will change the field of "is_active" to the opposite of what it currently is
                                        )
                                    }}>Reactivate User</button>
                                }
                                </td>
                        :
                        ''
                        }
                        
                        {isAdmin ? 
                            <td><div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={u.user.is_staff} id={u.id} data-index={index} onChange={approvalHandler}/>
                            <label className="form-check-label" for="defaultCheck1">
                                Admin
                            </label>
                            </div>
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={!u.user.is_staff} id={u.id} data-index={index} onChange={approvalHandler}/>
                            <label className="form-check-label" for="defaultCheck1">
                                User
                            </label>
                            </div>
                        </td>    
                        :
                        ''
                        }
                        {/* The confirmation that appears after a user clicks the DEACTIVATE USER button */}
                        { deleteWarning === u.id
                                    ? <div className="alert alert-danger" role="alert">
                                        Are you sure you want to deactivate this user?
                                        {/* When an admin clicks the yes deactivate button it will change the "is_active" field on the user to the opposite of current state */}
                                        <button className = "btn btn-secondary" onClick={() => {changeUserActiveStatus(u.id, !u.user.is_active).then(props.history.go(0))}}>Yes, deactivate</button>
                                        <button className = "btn btn-secondary" onClick={() => {setDeleteWarning(false)}}>No, cancel</button>
                                    </div>
                                    : ''
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