import React, { useState } from "react"

export const SubscriptionContext = React.createContext()

export const SubscriptionProvider = (props) => {
    const token = localStorage.getItem("rare_user_id")

    const [subscribedAuthors, setSubscribedAuthors] = useState([])


    const getSubscriptionsByUser = (userId) => {
        return fetch(`http://localhost:8000/subscriptions?user_id=${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(res => res.json())
            .then(res => {
                const authors = []
                res.forEach((subscription) => {
                    authors.push(subscription.author_id)
                })
                setSubscribedAuthors(authors)})
    }


    return (
        <SubscriptionContext.Provider value = {{
            getSubscriptionsByUser, subscribedAuthors
        }}>
            {props.children}
        </SubscriptionContext.Provider>
    )
};