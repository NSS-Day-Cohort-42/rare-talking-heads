import React from "react"
import { Route } from "react-router-dom"
import { PostDetail } from "./posts/PostDetail"
import { PostProvider } from "./posts/PostProvider"
import { PostList } from "./posts/PostList"
import {CategoryProvider} from "./categories/CategoryProvider"
import {CategoryList} from "./categories/CategoryList"
import {CategoryForm} from "./categories/CategoryForm"


export const ApplicationViews = (props) => {
    return (
    <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            
        </main>

        <PostProvider>
            <Route exact path="/posts/:postId(\d+)" render={ props => <PostDetail {...props} /> } />

            <Route exact path="/">
                <PostList />
            </Route>
        </PostProvider>
        
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
        </CategoryProvider>
        
        
    </>

    )
    
}
