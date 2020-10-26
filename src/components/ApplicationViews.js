import React from "react"
import { Route } from "react-router-dom"
import { PostDetail } from "./posts/PostDetail"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"

export const ApplicationViews = () => {
    return (
        <>


            <PostProvider>
                <Route path="/">
                    <PostList />
                </Route>
            </PostProvider>

            <PostProvider>
                <Route path="/posts/:postId(\d+)" render={ props => <PostDetail {...props} /> } />
            </PostProvider>

        </>
    )
}
