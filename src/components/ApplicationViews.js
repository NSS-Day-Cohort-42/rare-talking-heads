import React from "react"
import { Route } from "react-router-dom"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"

export const ApplicationViews = () => {
    return (
        <>
            <main style={{
                margin: "5rem 2rem",
                lineHeight: "1.75rem"
            }}>
            </main>

            <PostProvider>
                <Route path="/">
                    <PostList />
                </Route>
            </PostProvider>


        </>
    )
}
