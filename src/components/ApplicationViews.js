import React from "react"
import { Route, Switch } from "react-router-dom"
import { PostDetail } from "./posts/PostDetail"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"

export const ApplicationViews = () => {
    return (
        <>
            <PostProvider>
                <Route path="/posts/:postId(\d+)" render={ props => <PostDetail {...props} /> } />
                <Route exact path="/">
                    <PostList />
                </Route>
            </PostProvider>

        </>
    )
}
