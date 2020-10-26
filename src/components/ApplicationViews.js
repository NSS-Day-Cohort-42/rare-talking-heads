import React from "react"
import { Route } from "react-router-dom"
import { PostDetail } from "./posts/PostDetail"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import { PostForm } from "./posts/PostForm"

import {CategoryProvider} from "./categories/CategoryProvider"
import {CategoryList} from "./categories/CategoryList"
import {CategoryForm} from "./categories/CategoryForm"
import {CategoryViewPosts} from "./categories/CategoryPost"


export const ApplicationViews = (props) => {
    return (
    <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            
        </main>

        {/* Post Section Begins */}
        <PostProvider>
                <Route exact path="/" render={
                    props => {
                        return <PostList history={props.history} />}
                }>
                </Route>

                {/* When the URL changes to /posts/create render the PostForm */}
                <CategoryProvider>
                    <Route exact path="/posts/create" render={
                        props => {
                            return <PostForm {...props} />
                        }
                    }>

                    </Route>
                </CategoryProvider>
            
            <Route exact path="/posts/:postId(\d+)" render={ props => <PostDetail {...props} /> } />
        </PostProvider>
        {/* Post Section Ends */}
        
        {/* Category Section Begins */}
        <PostProvider>
            <CategoryProvider>
                    <Route exact path = "/categories" render={
                        props => {
                            return <CategoryList history={props.history} />
                        }
                    } />

                    <Route exact path ="/categories/create" render={
                        props => {
                            return <CategoryForm {...props} />
                        }
                    } />

                    <Route exact path="/categories/edit/:categoryId(\d+)" render={
                        props => <CategoryForm {...props} />
                    } />

                    <Route exact path="/posts/category/:categoryId(\d+)" render={
                        props => <CategoryViewPosts {...props} />
                    } />
            </CategoryProvider>
        </PostProvider>
        {/* Category Section Ends */}
        
        
    </>

    )
    
}
