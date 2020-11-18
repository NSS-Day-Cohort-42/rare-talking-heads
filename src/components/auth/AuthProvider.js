import React, { useState, useEffect } from "react"

export const ProfileContext = React.createContext()

export const ProfileProvider = (props) => {
    const [profile, setProfile] = useState({events:[]})
    const [isAdmin, setIsAdmin] = useState(false)
    const [ isActive, setIsActive ] = useState(false)

    const getProfile = () => {
        return fetch("http://localhost:8000/profile", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(response => response.json())
            .then(setProfile)
    }

    

    useEffect(getProfile, [])

    useEffect(() => {
        if (profile.user) {
            setIsAdmin(profile.user.is_staff)
            setIsActive(profile.user.isActive)
        }
    }, [profile])

    return (
        <ProfileContext.Provider value={{
            profile, getProfile, isAdmin, setIsAdmin, isActive, setIsActive
        }}>
            {props.children}
        </ProfileContext.Provider>
    )
}
