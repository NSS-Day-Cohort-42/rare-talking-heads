import React, {useState} from 'react'

export const UserContext = React.createContext()

export const UserProvider = props => {
    const [users, setUsers] = useState([])

    const getAllUsers = () => {
        return fetch("http://localhost:8000/users", {
            method : "GET",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(r => r.json())
        .then(setUsers)
    }

    const getSingleUser = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            method: "GET",
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(r => r.json())
    }

    return (
        <UserContext.Provider value={{
            users,
            getAllUsers,
            getSingleUser
        }}>
            {props.children}
        </UserContext.Provider>
    )


}