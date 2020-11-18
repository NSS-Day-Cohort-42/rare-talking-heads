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

    const changeUserType = (userId, userType) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            method : "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({is_staff : userType})
        }).then(getAllUsers)
    }

    const changeUserActiveStatus = ( userId, isActive ) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({ is_active : isActive })
        }).then(getAllUsers)
    }

    return (
        <UserContext.Provider value={{
            users,
            getAllUsers,
            getSingleUser,
            changeUserType,
            changeUserActiveStatus

        }}>
            {props.children}
        </UserContext.Provider>
    )


}